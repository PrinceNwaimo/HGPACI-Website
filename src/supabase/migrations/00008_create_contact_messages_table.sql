
-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_prayer_request BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact messages
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Only admins can view contact messages
CREATE POLICY "Admins can view all contact messages" ON contact_messages
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- Only admins can update contact messages
CREATE POLICY "Admins can update contact messages" ON contact_messages
  FOR UPDATE TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Only admins can delete contact messages
CREATE POLICY "Admins can delete contact messages" ON contact_messages
  FOR DELETE TO authenticated
  USING (is_admin(auth.uid()));

-- Create indexes for faster queries
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_is_prayer_request ON contact_messages(is_prayer_request);
