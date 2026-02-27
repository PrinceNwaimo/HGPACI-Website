import { supabase } from './supabase';

export interface MembershipApplication {
  id: string;
  name: string;
  marital_status: string;
  contact: string;
  how_did_you_know: string;
  country: string;
  state: string;
  wish_to_be_member: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MembershipFormData {
  name: string;
  marital_status: string;
  contact: string;
  how_did_you_know: string;
  country: string;
  state: string;
  wish_to_be_member: boolean;
}

// Submit membership application
export async function submitMembershipApplication(data: MembershipFormData): Promise<void> {
  const { error } = await supabase
    .from('membership_applications')
    .insert([data]);

  if (error) {
    console.error('Error submitting membership application:', error);
    throw error;
  }
}

// Fetch all membership applications (admin only)
export async function fetchMembershipApplications(): Promise<MembershipApplication[]> {
  const { data, error } = await supabase
    .from('membership_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching membership applications:', error);
    throw error;
  }

  return data || [];
}

// Update application status (admin only)
export async function updateApplicationStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('membership_applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}