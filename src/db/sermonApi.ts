import { supabase } from './supabase';

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series?: string;
  scripture?: string;
  description?: string;
  video_url?: string;
  thumbnail_url?: string;
  duration?: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface SermonFormData {
  title: string;
  speaker: string;
  date: string;
  series?: string;
  scripture?: string;
  description?: string;
}

// Fetch all sermons
export async function fetchSermons(): Promise<Sermon[]> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching sermons:', error);
    throw error;
  }

  return data || [];
}

// Fetch a single sermon by ID
export async function fetchSermonById(id: string): Promise<Sermon | null> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching sermon:', error);
    throw error;
  }

  return data;
}

// Upload video file to storage
export async function uploadVideo(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `videos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('sermon-videos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Error uploading video:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('sermon-videos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Upload thumbnail file to storage
export async function uploadThumbnail(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `thumbnails/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('sermon-thumbnails')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Error uploading thumbnail:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('sermon-thumbnails')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Create a new sermon
export async function createSermon(
  sermonData: SermonFormData,
  videoUrl?: string,
  thumbnailUrl?: string,
  duration?: number
): Promise<Sermon> {
  const { data, error } = await supabase
    .from('sermons')
    .insert([
      {
        ...sermonData,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        duration,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating sermon:', error);
    throw error;
  }

  return data;
}

// Update sermon views
export async function incrementSermonViews(id: string): Promise<void> {
  const { error } = await supabase.rpc('increment_sermon_views', { sermon_id: id });

  if (error) {
    // If RPC doesn't exist, use a simple update
    const sermon = await fetchSermonById(id);
    if (sermon) {
      await supabase
        .from('sermons')
        .update({ views: sermon.views + 1 })
        .eq('id', id);
    }
  }
}

// Delete a sermon
export async function deleteSermon(id: string): Promise<void> {
  const { error } = await supabase
    .from('sermons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting sermon:', error);
    throw error;
  }
}

// Get video duration from file
export function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(Math.floor(video.duration));
    };

    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
    };

    video.src = URL.createObjectURL(file);
  });
}