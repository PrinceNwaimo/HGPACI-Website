import { supabase } from './supabase';

export interface Profile {
  id: string;
  email: string | null;
  username: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalSermons: number;
  totalViews: number;
  totalUsers: number;
  recentSermons: number;
}

// Fetch all users (admin only)
export async function fetchAllUsers(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

  return data || [];
}

// Update user role (admin only)
export async function updateUserRole(userId: string, newRole: 'user' | 'admin'): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}

// Delete user (admin only)
export async function deleteUser(userId: string): Promise<void> {
  // Note: This will cascade delete the profile due to foreign key constraint
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Get dashboard statistics
export async function getDashboardStats(): Promise<DashboardStats> {
  // Get total sermons
  const { count: totalSermons } = await supabase
    .from('sermons')
    .select('*', { count: 'exact', head: true });

  // Get total views
  const { data: sermonsData } = await supabase
    .from('sermons')
    .select('views');
  
  const totalViews = sermonsData?.reduce((sum, sermon) => sum + (sermon.views || 0), 0) || 0;

  // Get total users
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // Get recent sermons (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { count: recentSermons } = await supabase
    .from('sermons')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString());

  return {
    totalSermons: totalSermons || 0,
    totalViews,
    totalUsers: totalUsers || 0,
    recentSermons: recentSermons || 0,
  };
}

// Get top sermons by views
export async function getTopSermons(limit: number = 5) {
  const { data, error } = await supabase
    .from('sermons')
    .select('id, title, speaker, views, date')
    .order('views', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top sermons:', error);
    throw error;
  }

  return data || [];
}

// Get recent users
export async function getRecentUsers(limit: number = 5) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, role, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent users:', error);
    throw error;
  }

  return data || [];
}
