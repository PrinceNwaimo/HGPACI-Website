-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  role public.user_role DEFAULT 'user'::public.user_role,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = uid AND p.role = 'admin'::public.user_role
  );
$$;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON public.profiles
  FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Create public view for shareable profile info
CREATE OR REPLACE VIEW public.public_profiles AS
  SELECT id, username, role FROM public.profiles;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
  username_value text;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  
  -- Extract username from email (format: username@miaoda.com)
  username_value := split_part(NEW.email, '@', 1);
  
  -- Insert profile with first user as admin
  INSERT INTO public.profiles (id, email, username, role)
  VALUES (
    NEW.id,
    NEW.email,
    username_value,
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user confirmation
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION public.handle_new_user();

-- Update sermons table RLS policies to require admin
DROP POLICY IF EXISTS "Anyone can insert sermons" ON public.sermons;
DROP POLICY IF EXISTS "Anyone can update sermons" ON public.sermons;
DROP POLICY IF EXISTS "Anyone can delete sermons" ON public.sermons;

-- New policies: Only admins can insert/update/delete sermons
CREATE POLICY "Only admins can insert sermons" ON public.sermons
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update sermons" ON public.sermons
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete sermons" ON public.sermons
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- Storage policies: Only admins can upload
DROP POLICY IF EXISTS "Anyone can upload sermon videos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete sermon videos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload sermon thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete sermon thumbnails" ON storage.objects;

CREATE POLICY "Only admins can upload sermon videos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'sermon-videos' AND public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete sermon videos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'sermon-videos' AND public.is_admin(auth.uid()));

CREATE POLICY "Only admins can upload sermon thumbnails" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'sermon-thumbnails' AND public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete sermon thumbnails" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'sermon-thumbnails' AND public.is_admin(auth.uid()));