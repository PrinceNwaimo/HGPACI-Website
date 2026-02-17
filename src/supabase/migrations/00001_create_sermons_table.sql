-- Create sermons table for video sermon management
CREATE TABLE IF NOT EXISTS sermons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL,
  series TEXT,
  scripture TEXT,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS sermons_date_idx ON sermons(date DESC);
CREATE INDEX IF NOT EXISTS sermons_series_idx ON sermons(series);

-- Enable Row Level Security
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view sermons
CREATE POLICY "Anyone can view sermons"
  ON sermons
  FOR SELECT
  TO public
  USING (true);

-- Policy: Anyone can insert sermons (can be restricted later with auth)
CREATE POLICY "Anyone can insert sermons"
  ON sermons
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Anyone can update sermons (can be restricted later with auth)
CREATE POLICY "Anyone can update sermons"
  ON sermons
  FOR UPDATE
  TO public
  USING (true);

-- Policy: Anyone can delete sermons (can be restricted later with auth)
CREATE POLICY "Anyone can delete sermons"
  ON sermons
  FOR DELETE
  TO public
  USING (true);

-- Create storage bucket for sermon videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('sermon-videos', 'sermon-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for sermon thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('sermon-thumbnails', 'sermon-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Anyone can upload videos
CREATE POLICY "Anyone can upload sermon videos"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'sermon-videos');

-- Storage policy: Anyone can view videos
CREATE POLICY "Anyone can view sermon videos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'sermon-videos');

-- Storage policy: Anyone can delete videos
CREATE POLICY "Anyone can delete sermon videos"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'sermon-videos');

-- Storage policy: Anyone can upload thumbnails
CREATE POLICY "Anyone can upload sermon thumbnails"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'sermon-thumbnails');

-- Storage policy: Anyone can view thumbnails
CREATE POLICY "Anyone can view sermon thumbnails"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'sermon-thumbnails');

-- Storage policy: Anyone can delete thumbnails
CREATE POLICY "Anyone can delete sermon thumbnails"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'sermon-thumbnails');
