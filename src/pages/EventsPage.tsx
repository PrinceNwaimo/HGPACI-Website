import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Flame } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "Holy Ghost Fire Conference",
      date: "March 15-17, 2025",
      time: "Friday 7:00 PM - Sunday 5:00 PM",
      location: "Main Sanctuary",
      description: "Three days of powerful worship, anointed teaching, and supernatural encounters. Experience fresh fire from heaven as we seek God's face together.",
      featured: true,
    },
    {
      title: "Youth Encounter Night",
      date: "March 22, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Youth Center",
      description: "A special night for young people to encounter God's presence through worship, testimonies, and ministry. Bring your friends!",
      featured: false,
    },
    {
      title: "Community Outreach Day",
      date: "March 29, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Various Locations",
      description: "Join us as we serve our community with love and compassion. We'll be providing food, clothing, and prayer to those in need.",
      featured: false,
    },
    {
      title: "Prayer & Fasting Week",
      date: "April 1-7, 2025",
      time: "Daily Prayer at 6:00 AM & 7:00 PM",
      location: "Church Sanctuary",
      description: "A consecrated week of prayer and fasting to seek God's face and intercede for breakthrough in our lives, families, and nation.",
      featured: false,
    },
    {
      title: "Women's Empowerment Conference",
      date: "April 12-13, 2025",
      time: "Saturday 10:00 AM - Sunday 4:00 PM",
      location: "Main Sanctuary",
      description: "A powerful gathering for women to be refreshed, renewed, and empowered to walk in their God-given purpose and authority.",
      featured: false,
    },
    {
      title: "Healing & Miracle Service",
      date: "April 19, 2025",
      time: "7:00 PM - 10:00 PM",
      location: "Main Sanctuary",
      description: "A special service dedicated to healing and miracles. Come expecting to receive your breakthrough as we minister in the power of the Holy Spirit.",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <Calendar className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-4" />
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">Events Calendar</h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            Join us for special services and life-changing events
          </p>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 gradient-text max-sm:text-2xl">
              Upcoming Events
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              Mark your calendar and join us for these powerful gatherings
            </p>
          </div>

          {upcomingEvents.map((event, index) => {
            if (event.featured) {
              return (
                <Card
                  key={index}
                  className="mb-12 xl:mb-16 elegant-shadow glow-effect border-2 border-accent"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
                    <div className="relative h-[250px] xl:h-auto">
                      <img
                        src="conference-event-image.jpg"
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm xl:text-base">
                        Featured Event
                      </div>
                    </div>
                    <div className="p-6 xl:p-12">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl xl:text-4xl mb-4 gradient-gold-text max-sm:text-xl">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Calendar className="w-5 h-5 flex-shrink-0 text-primary" />
                            <span className="font-semibold max-sm:text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Clock className="w-5 h-5 flex-shrink-0 text-primary" />
                            <span className="font-semibold max-sm:text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                            <span className="font-semibold max-sm:text-sm">{event.location}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-6 text-base xl:text-lg max-sm:text-sm">
                          {event.description}
                        </p>
                        <Button asChild size="lg" className="w-full xl:w-auto">
                          <Link to="/contact">Register Now</Link>
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            }
            return null;
          })}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
            {upcomingEvents.map((event, index) => {
              if (!event.featured) {
                return (
                  <Card
                    key={index}
                    className="elegant-shadow hover:glow-effect transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Calendar className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span className="text-sm xl:text-base max-sm:text-xs">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span className="text-sm xl:text-base max-sm:text-xs">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span className="text-sm xl:text-base max-sm:text-xs">{event.location}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm xl:text-base max-sm:text-xs">
                        {event.description}
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/contact">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })}
          </div>

          <div className="mt-16 xl:mt-24 bg-primary text-white rounded-lg p-8 xl:p-12 text-center glow-effect">
            <Flame className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-6" />
            <h3 className="text-2xl xl:text-4xl font-bold mb-4 max-sm:text-xl">
              Stay Connected
            </h3>
            <p className="text-lg xl:text-xl mb-8 text-white/90 max-w-2xl mx-auto max-sm:text-base">
              Don't miss out on upcoming events and special services. Contact us to be added to our mailing list and receive regular updates.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Get Event Updates</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
