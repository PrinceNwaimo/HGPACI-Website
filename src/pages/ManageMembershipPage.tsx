import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  UserPlus,
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchMembershipApplications, 
  updateApplicationStatus,
  type MembershipApplication 
} from '@/db/membershipApi';

const ManageMembershipPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<MembershipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = applications.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  }, [searchQuery, applications]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchMembershipApplications();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load membership applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateApplicationStatus(id, newStatus);
      toast({
        title: 'Status Updated',
        description: 'Application status has been updated successfully',
      });
      loadApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive',
      });
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStats = () => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'pending').length;
    const approved = applications.filter(a => a.status === 'approved').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;
    return { total, pending, approved, rejected };
  };

  const stats = getStats();

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold gradient-text">Manage Membership Applications</h1>
              </div>
              <p className="text-muted-foreground">
                Review and manage membership applications
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Back to Dashboard
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-2xl font-bold">{stats.approved}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, contact, country, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Applications Table */}
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>All Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">
                  {searchQuery ? 'No applications found' : 'No applications yet'}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? 'Try a different search term' 
                    : 'Applications will appear here when people submit the membership form'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Marital Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>How They Knew</TableHead>
                      <TableHead>Wants Membership</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>{app.contact}</TableCell>
                        <TableCell className="capitalize">{app.marital_status}</TableCell>
                        <TableCell>{app.state}, {app.country}</TableCell>
                        <TableCell>
                          {app.how_did_you_know === 'someone_introduced' 
                            ? 'Someone introduced' 
                            : 'Through Internet'}
                        </TableCell>
                        <TableCell>
                          {app.wish_to_be_member ? (
                            <span className="text-green-600 font-medium">Yes</span>
                          ) : (
                            <span className="text-muted-foreground">No</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDate(app.created_at)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(app.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={app.status}
                            onValueChange={(value) => handleStatusChange(app.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageMembershipPage;
