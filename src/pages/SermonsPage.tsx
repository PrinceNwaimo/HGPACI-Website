import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Play, Calendar, User, BookOpen, Upload, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { fetchSermons, incrementSermonViews, type Sermon } from "@/db/sermonApi";

const SermonsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    try {
      setLoading(true);
      const data = await fetchSermons();
      setSermons(data);
    } catch (error) {
      console.error("Error loading sermons:", error);
      toast({
        title: "Error",
        description: "Failed to load sermons",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySermon = async (sermon: Sermon) => {
    if (!sermon.video_url) {
      toast({
        title: "No Video",
        description: "This sermon does not have a video available",
        variant: "destructive",
      });
      return;
    }

    setSelectedSermon(sermon);
    setIsVideoDialogOpen(true);

    // Increment views
    try {
      await incrementSermonViews(sermon.id);
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Sermons</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Watch powerful messages that will transform your life and strengthen your faith
          </p>
          {isAdmin && (
            <Button
              onClick={() => navigate("/upload-sermon")}
              variant="secondary"
              size="lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Sermon
            </Button>
          )}
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : sermons.length === 0 ? (
            <div className="text-center py-20">
              <Flame className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">No Sermons Yet</h3>
              <p className="text-muted-foreground mb-6">
                {isAdmin 
                  ? "Be the first to upload a sermon and share the Word of God"
                  : "Check back soon for powerful messages from our pastors"}
              </p>
              {isAdmin && (
                <Button onClick={() => navigate("/upload-sermon")}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload First Sermon
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon) => (
                <Card key={sermon.id} className="hover:shadow-glow transition-shadow overflow-hidden">
                  {/* Thumbnail */}
                  {sermon.thumbnail_url ? (
                    <div className="relative aspect-video bg-muted group cursor-pointer" onClick={() => handlePlaySermon(sermon)}>
                      <img
                        src={sermon.thumbnail_url}
                        alt={sermon.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                      {sermon.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(sermon.duration)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group cursor-pointer" onClick={() => handlePlaySermon(sermon)}>
                      <Flame className="w-16 h-16 text-primary/40" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                      {sermon.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(sermon.duration)}
                        </div>
                      )}
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{sermon.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(sermon.date)}</span>
                      </div>
                      {sermon.scripture && (
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4" />
                          <span>{sermon.scripture}</span>
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {sermon.series && (
                      <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {sermon.series}
                      </div>
                    )}
                    {sermon.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {sermon.description}
                      </p>
                    )}
                    <Button
                      className="w-full"
                      onClick={() => handlePlaySermon(sermon)}
                      disabled={!sermon.video_url}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Sermon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Player Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedSermon?.title}</DialogTitle>
          </DialogHeader>
          {selectedSermon?.video_url && (
            <div className="space-y-4">
              <video
                controls
                autoPlay
                className="w-full rounded-lg"
                src={selectedSermon.video_url}
              >
                Your browser does not support the video tag.
              </video>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{selectedSermon.speaker}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedSermon.date)}</span>
                </div>
                {selectedSermon.scripture && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{selectedSermon.scripture}</span>
                  </div>
                )}
                {selectedSermon.series && (
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {selectedSermon.series}
                  </div>
                )}
                {selectedSermon.description && (
                  <p className="text-muted-foreground pt-2">{selectedSermon.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SermonsPage;
