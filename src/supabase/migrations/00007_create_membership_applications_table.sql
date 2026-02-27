
-- Create membership applications table
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  contact TEXT NOT NULL,
  how_did_you_know TEXT NOT NULL,
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  wish_to_be_member BOOLEAN NOT NULL DEFAULT true,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit membership application
CREATE POLICY "Anyone can submit membership application" ON membership_applications
  FOR INSERT
  WITH CHECK (true);

-- Only admins can view all applications
CREATE POLICY "Admins can view all applications" ON membership_applications
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- Only admins can update applications
CREATE POLICY "Admins can update applications" ON membership_applications
  FOR UPDATE TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Create index for faster queries
CREATE INDEX idx_membership_applications_created_at ON membership_applications(created_at DESC);
CREATE INDEX idx_membership_applications_status ON membership_applications(status);
