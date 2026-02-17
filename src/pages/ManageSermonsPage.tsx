import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User,
  Upload,
  Search
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { fetchSermons, deleteSermon, type Sermon } from '@/db/sermonApi';

const ManageSermonsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<Sermon | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadSermons();
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = sermons.filter(sermon =>
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.series?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSermons(filtered);
    } else {
      setFilteredSermons(sermons);
    }
  }, [searchQuery, sermons]);

  const loadSermons = async () => {
    try {
      setLoading(true);
      const data = await fetchSermons();
      setSermons(data);
      setFilteredSermons(data);
    } catch (error) {
      console.error('Error loading sermons:', error);
      toast({
        title: 'Error',
        description: 'Failed to load sermons',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (sermon: Sermon) => {
    setSermonToDelete(sermon);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!sermonToDelete) return;

    try {
      await deleteSermon(sermonToDelete.id);
      toast({
        title: 'Success',
        description: 'Sermon deleted successfully',
      });
      loadSermons();
    } catch (error) {
      console.error('Error deleting sermon:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete sermon',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setSermonToDelete(null);
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

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold gradient-text">Manage Sermons</h1>
              </div>
              <p className="text-muted-foreground">
                View, edit, and delete sermons
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/admin')}>
                Back to Dashboard
              </Button>
              <Button onClick={() => navigate('/upload-sermon')}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Sermon
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search sermons by title, speaker, or series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sermons Table */}
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>All Sermons ({filteredSermons.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSermons.length === 0 ? (
              <div className="text-center py-12">
                <Flame className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">
                  {searchQuery ? 'No sermons found' : 'No sermons yet'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? 'Try a different search term' 
                    : 'Upload your first sermon to get started'}
                </p>
                {!searchQuery && (
                  <Button onClick={() => navigate('/upload-sermon')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Sermon
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Speaker</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Series</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSermons.map((sermon) => (
                      <TableRow key={sermon.id}>
                        <TableCell className="font-medium max-w-xs">
                          <div className="truncate">{sermon.title}</div>
                        </TableCell>
                        <TableCell>{sermon.speaker}</TableCell>
                        <TableCell>{formatDate(sermon.date)}</TableCell>
                        <TableCell>
                          {sermon.series ? (
                            <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                              {sermon.series}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{formatDuration(sermon.duration)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span>{sermon.views}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate('/sermons')}
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(sermon)}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Sermon</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{sermonToDelete?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ManageSermonsPage;
