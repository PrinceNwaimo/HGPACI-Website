import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Flame } from "lucide-react";
import churchLogo from "@/assets/Church Logo.jpeg";
import oneBigNightImg from "@/assets/event/Big Night.jpeg";
import anointingImg from "@/assets/event/Anointing.jpeg";


export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "One big night with the king",
      date: "Last Friday of every month",
      time: "Friday 9:00 PM (All night)",
      location: "Church Auditorium",
      description: "An extraordinary night of worship, prayer, and encountering the presence of God. Join us for a powerful time of seeking God's face and experiencing His glory.",
      featured: true,
       image: oneBigNightImg,
    },
    {
      title: "Anointing For the New Month",
      date: "First day of every month",
      time: "6:00 PM - 7:30 PM",
      location: "Church Auditorium",
      description: "A special time of anointing and preparation for the new month. Come expecting God's presence and favor.",
      featured: true,
      image: anointingImg,
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
                        src={event.image}
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
            <img
  src={churchLogo}
  alt="Holy Ghost Power Anointed Church International Logo"
  className="w-16 h-16 xl:w-20 xl:h-20 mx-auto animate-pulse object-contain"
/>
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
