import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Play } from "lucide-react";

export default function SermonsPage() {
  const sermons = [
    {
      title: "The Anointing That Breaks the Yoke",
      date: "March 10, 2025",
      speaker: "Pastor John Smith",
      series: "Walking in Power",
      description: "Discover how the anointing of the Holy Spirit destroys every burden and sets captives free. Learn to walk in the supernatural power available to every believer.",
      scripture: "Isaiah 10:27",
    },
    {
      title: "Positioned for Breakthrough",
      date: "March 3, 2025",
      speaker: "Pastor John Smith",
      series: "Walking in Power",
      description: "Understanding your spiritual position in Christ and how to align yourself for the breakthrough God has promised you.",
      scripture: "Ephesians 2:6",
    },
    {
      title: "The Power of Persistent Prayer",
      date: "February 24, 2025",
      speaker: "Minister Sarah Johnson",
      series: "Prayer Warriors",
      description: "Learn the secrets of effective prayer and how persistence in prayer moves the hand of God and changes circumstances.",
      scripture: "Luke 18:1-8",
    },
    {
      title: "Walking in Divine Purpose",
      date: "February 17, 2025",
      speaker: "Pastor John Smith",
      series: "Destiny Series",
      description: "God has a unique purpose for your life. Discover how to identify and walk in the calling He has placed upon you.",
      scripture: "Jeremiah 29:11",
    },
    {
      title: "The Fire of the Holy Spirit",
      date: "February 10, 2025",
      speaker: "Prophet David Williams",
      series: "Spirit-Filled Living",
      description: "Experience a fresh baptism of fire as we explore what it means to be filled with the Holy Spirit and walk in His power daily.",
      scripture: "Acts 2:1-4",
    },
    {
      title: "Faith That Moves Mountains",
      date: "February 3, 2025",
      speaker: "Pastor John Smith",
      series: "Faith Foundations",
      description: "Activate your faith to see the impossible become possible. Learn how to speak to your mountains and watch them move.",
      scripture: "Mark 11:22-24",
    },
    {
      title: "Healing and Wholeness",
      date: "January 27, 2025",
      speaker: "Minister Grace Thompson",
      series: "Healing Ministry",
      description: "God's will is for you to be whole in spirit, soul, and body. Receive the truth about divine healing and how to walk in health.",
      scripture: "3 John 1:2",
    },
    {
      title: "The Authority of the Believer",
      date: "January 20, 2025",
      speaker: "Pastor John Smith",
      series: "Spiritual Warfare",
      description: "Understand the authority you have been given in Christ and how to exercise it over every circumstance and challenge.",
      scripture: "Luke 10:19",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <BookOpen className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-4" />
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">Sermons</h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            Anointed messages that transform lives and break every yoke
          </p>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 gradient-text max-sm:text-2xl">
              Recent Messages
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              Listen to powerful teachings from God's Word that will strengthen your faith and empower your walk with Christ
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
            {sermons.map((sermon, index) => (
              <Card
                key={index}
                className="elegant-shadow hover:glow-effect transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">{sermon.title}</CardTitle>
                    <Button size="icon" variant="outline" className="flex-shrink-0">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col xl:flex-row xl:items-center gap-2 xl:gap-4 text-sm text-muted-foreground max-sm:text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{sermon.date}</span>
                    </div>
                    <span className="hidden xl:inline">•</span>
                    <span className="font-semibold">{sermon.speaker}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold max-sm:text-xs">
                      {sermon.series}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm xl:text-base max-sm:text-xs">
                    {sermon.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 max-sm:text-xs">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span className="font-semibold">{sermon.scripture}</span>
                  </div>
                  <div className="flex flex-col xl:flex-row gap-3">
                    <Button className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Listen Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 xl:mt-24 grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
            <Card className="elegant-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Sermon Series</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Browse our collection of sermon series on various topics to deepen your understanding of God's Word
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 xl:w-10 xl:h-10 text-accent" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Video Messages</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Watch full service recordings and experience the powerful atmosphere of our worship and teaching
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Podcast</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Subscribe to our podcast and never miss a message. Available on all major podcast platforms
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 xl:mt-24 bg-muted/30 rounded-lg p-8 xl:p-12 text-center">
            <h3 className="text-2xl xl:text-4xl font-bold mb-4 max-sm:text-xl">
              Can't Find What You're <span className="gradient-gold-text">Looking For?</span>
            </h3>
            <p className="text-base xl:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 max-sm:text-sm">
              We have an extensive archive of sermons and teachings. Contact us to request specific messages or topics you'd like to hear.
            </p>
            <Button size="lg">Request a Message</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
