import { supabase } from './supabase';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_prayer_request: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  is_prayer_request?: boolean;
}

// Submit contact message
export async function submitContactMessage(data: ContactFormData): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .insert([{
      ...data,
      is_prayer_request: data.is_prayer_request || false,
    }]);

  if (error) {
    console.error('Error submitting contact message:', error);
    throw error;
  }
}

// Fetch all contact messages (admin only)
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }

  return data || [];
}

// Update message status (admin only)
export async function updateMessageStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
}

// Delete contact message (admin only)
export async function deleteContactMessage(id: string): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
}

// Get contact message statistics
export async function getContactStats(): Promise<{
  total: number;
  unread: number;
  read: number;
  prayerRequests: number;
}> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('status, is_prayer_request');

  if (error) {
    console.error('Error fetching contact stats:', error);
    throw error;
  }

  const total = data?.length || 0;
  const unread = data?.filter(m => m.status === 'unread').length || 0;
  const read = data?.filter(m => m.status === 'read').length || 0;
  const prayerRequests = data?.filter(m => m.is_prayer_request).length || 0;

  return { total, unread, read, prayerRequests };
}
