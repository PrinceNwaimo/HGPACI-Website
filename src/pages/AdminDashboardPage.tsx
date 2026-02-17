import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Users, 
  Video, 
  Eye, 
  TrendingUp,
  Calendar,
  Upload,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getDashboardStats,
  getTopSermons,
  getRecentUsers,
  type DashboardStats,
} from '@/db/adminApi';

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topSermons, setTopSermons] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadDashboardData();
  }, [isAdmin, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, topSermonsData, recentUsersData] = await Promise.all([
        getDashboardStats(),
        getTopSermons(5),
        getRecentUsers(5),
      ]);
      setStats(statsData);
      setTopSermons(topSermonsData);
      setRecentUsers(recentUsersData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back, {profile?.username}! Manage your church website from here.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={() => navigate('/upload-sermon')}
            className="h-auto py-4 flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Sermon</span>
          </Button>
          <Button
            onClick={() => navigate('/admin/sermons')}
            variant="outline"
            className="h-auto py-4 flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" />
            <span>Manage Sermons</span>
          </Button>
          <Button
            onClick={() => navigate('/admin/users')}
            variant="outline"
            className="h-auto py-4 flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            <span>Manage Users</span>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sermons</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalSermons || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.recentSermons || 0} added this month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalViews || 0}</div>
              <p className="text-xs text-muted-foreground">
                Across all sermons
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                Registered accounts
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.recentSermons || 0}</div>
              <p className="text-xs text-muted-foreground">
                Sermons in last 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Sermons and Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Sermons */}
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle>Top Sermons by Views</CardTitle>
              <CardDescription>Most watched sermons</CardDescription>
            </CardHeader>
            <CardContent>
              {topSermons.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No sermons yet
                </p>
              ) : (
                <div className="space-y-4">
                  {topSermons.map((sermon, index) => (
                    <div
                      key={sermon.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => navigate('/sermons')}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{sermon.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {sermon.speaker} • {formatDate(sermon.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{sermon.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Newly registered accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {recentUsers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No users yet
                </p>
              ) : (
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => navigate('/admin/users')}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined {formatDate(user.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {user.role}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;