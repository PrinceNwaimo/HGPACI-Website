import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Flame } from "lucide-react";

export default function ServiceTimesPage() {
  const services = [
    {
      name: "Sunday Service",
      day: "Every Sunday",
      time: "10:00 AM - 12:30 PM",
      description: "Join us for powerful worship, anointed preaching, and the manifestation of God's presence. Experience breakthrough as we gather in unity to honor the Lord.",
      icon: Flame,
      color: "primary",
    },
    {
      name: "Wednesday Prayer & Bible Study",
      day: "Every Wednesday",
      time: "7:00 PM - 9:00 PM",
      description: "Deepen your understanding of God's Word and strengthen your prayer life. A time of intimate fellowship, teaching, and intercession.",
      icon: Calendar,
      color: "accent",
    },
    {
      name: "Friday Night Deliverance Service",
      day: "Every Friday",
      time: "8:00 PM - 10:00 PM",
      description: "Witness the power of God as chains are broken and captives are set free. A special service dedicated to healing, deliverance, and miracles.",
      icon: Flame,
      color: "primary",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <Clock className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-4" />
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">Service Times</h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            Join us as we gather to worship and experience God's power
          </p>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 gradient-text max-sm:text-2xl">
              Weekly Services
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              All are welcome to join us for life-transforming encounters with the Holy Spirit
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 mb-16 xl:mb-24">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="elegant-shadow hover:glow-effect transition-all duration-300"
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 xl:w-20 xl:h-20 ${
                        service.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                      } rounded-full flex items-center justify-center mb-4`}
                    >
                      <IconComponent
                        className={`w-8 h-8 xl:w-10 xl:h-10 ${
                          service.color === "primary" ? "text-primary" : "text-accent"
                        }`}
                      />
                    </div>
                    <CardTitle className="text-2xl xl:text-3xl max-sm:text-xl">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-5 h-5 flex-shrink-0" />
                        <span className="font-semibold max-sm:text-sm">{service.day}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-5 h-5 flex-shrink-0" />
                        <span className="font-semibold max-sm:text-sm">{service.time}</span>
                      </div>
                      <p className="text-muted-foreground pt-4 max-sm:text-sm">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="elegant-shadow bg-muted/30">
            <CardContent className="p-8 xl:p-12">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
                <div>
                  <h3 className="text-2xl xl:text-4xl font-bold mb-6 max-sm:text-xl">
                    Visit Us <span className="gradient-gold-text">In Person</span>
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg xl:text-xl mb-2 max-sm:text-base">Our Location</h4>
                        <p className="text-muted-foreground max-sm:text-sm">
                          123 Spirit Avenue<br />
                          Faith City, FC 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Flame className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg xl:text-xl mb-2 max-sm:text-base">What to Expect</h4>
                        <p className="text-muted-foreground max-sm:text-sm">
                          Come as you are! Experience warm fellowship, powerful worship, anointed teaching, and the tangible presence of the Holy Spirit.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col xl:flex-row gap-4">
                    <Button asChild size="lg" className="w-full xl:w-auto">
                      <Link to="/contact">Get Directions</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full xl:w-auto">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <img
                    src="church-building-image.jpg"
                    alt="Church building"
                    className="rounded-lg elegant-shadow w-full h-[300px] xl:h-[400px] object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-16 xl:mt-24 bg-primary text-white rounded-lg p-8 xl:p-12 text-center glow-effect">
            <Flame className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-6" />
            <h3 className="text-2xl xl:text-4xl font-bold mb-4 max-sm:text-xl">
              First Time Visitor?
            </h3>
            <p className="text-lg xl:text-xl mb-8 text-white/90 max-w-2xl mx-auto max-sm:text-base">
              We'd love to meet you! Let us know you're coming so we can prepare a warm welcome for you and your family.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Let Us Know You're Coming</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
