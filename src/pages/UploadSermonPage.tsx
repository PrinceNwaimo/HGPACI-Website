import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Flame, Upload, Video, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  createSermon,
  uploadVideo,
  uploadThumbnail,
  getVideoDuration,
  type SermonFormData,
} from "@/db/sermonApi";

const UploadSermonPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const form = useForm<SermonFormData>({
    defaultValues: {
      title: "",
      speaker: "",
      date: new Date().toISOString().split('T')[0],
      series: "",
      scripture: "",
      description: "",
    },
  });

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Video file must be less than 100MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a video file",
          variant: "destructive",
        });
        return;
      }

      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Thumbnail must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      setThumbnailFile(file);
    }
  };

  const onSubmit = async (data: SermonFormData) => {
    if (!videoFile) {
      toast({
        title: "Video Required",
        description: "Please select a video file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload video
      setUploadProgress("Uploading video...");
      const videoUrl = await uploadVideo(videoFile);

      // Get video duration
      setUploadProgress("Processing video...");
      const duration = await getVideoDuration(videoFile);

      // Upload thumbnail if provided
      let thumbnailUrl: string | undefined;
      if (thumbnailFile) {
        setUploadProgress("Uploading thumbnail...");
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }

      // Create sermon record
      setUploadProgress("Saving sermon...");
      await createSermon(data, videoUrl, thumbnailUrl, duration);

      toast({
        title: "Success!",
        description: "Sermon uploaded successfully",
      });

      // Navigate to sermons page
      navigate("/sermons");
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload sermon",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">Upload Sermon</h1>
          </div>
          <p className="text-muted-foreground">
            Share the Word of God with our congregation
          </p>
        </div>

        {/* Upload Form */}
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>Sermon Details</CardTitle>
            <CardDescription>
              Fill in the sermon information and upload the video
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sermon Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter sermon title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Speaker */}
                <FormField
                  control={form.control}
                  name="speaker"
                  rules={{ required: "Speaker is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaker *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter speaker name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Series */}
                <FormField
                  control={form.control}
                  name="series"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Series (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter sermon series" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Scripture */}
                <FormField
                  control={form.control}
                  name="scripture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scripture Reference (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John 3:16" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter sermon description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Video Upload */}
                <div className="space-y-2">
                  <FormLabel>Video File *</FormLabel>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Video className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                      id="video-upload"
                      disabled={isUploading}
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <div className="text-sm text-muted-foreground mb-2">
                        {videoFile ? (
                          <span className="text-primary font-medium">{videoFile.name}</span>
                        ) : (
                          "Click to upload video or drag and drop"
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        MP4, WebM, or other video formats (Max 100MB)
                      </div>
                    </label>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-2">
                  <FormLabel>Thumbnail Image (Optional)</FormLabel>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                      id="thumbnail-upload"
                      disabled={isUploading}
                    />
                    <label htmlFor="thumbnail-upload" className="cursor-pointer">
                      <div className="text-sm text-muted-foreground mb-2">
                        {thumbnailFile ? (
                          <span className="text-primary font-medium">{thumbnailFile.name}</span>
                        ) : (
                          "Click to upload thumbnail or drag and drop"
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        PNG, JPG, or GIF (Max 5MB)
                      </div>
                    </label>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{uploadProgress}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Sermon
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/sermons")}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadSermonPage;
