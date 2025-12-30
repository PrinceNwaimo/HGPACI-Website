import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Flame, Heart, Users, BookOpen } from "lucide-react";
import churchLogo from "@/assets/Church Logo.jpeg";
import churchImage from "@/assets/about/Church worship service.jpeg";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] xl:h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('hero-worship-image.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/80" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 flex justify-center">
            <img src={churchLogo}
    alt="Holy Ghost Power Anointed Church International Logo"
  className="w-16 h-16 xl:w-20 xl:h-20 mx-auto animate-pulse object-contain"
/>
          </div>
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-6 max-sm:text-3xl">
            Welcome to Holy Ghost Power Anointed Church International
          </h1>
          <p className="text-lg xl:text-2xl text-white/90 mb-8 max-w-3xl mx-auto max-sm:text-base">
            A vibrant, spirit-filled community devoted to the teachings of Jesus Christ and the power of the Holy Spirit
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 xl:p-8 mb-8 glow-effect">
            <p className="text-xl xl:text-3xl font-serif italic text-accent mb-2 max-sm:text-lg">
              "Not by might nor by power, but by My Spirit,"
            </p>
            <p className="text-lg xl:text-xl text-white max-sm:text-base">
              says the Lord Almighty. – Zechariah 4:6
            </p>
          </div>
          <div className="flex flex-col xl:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base xl:text-lg px-6 xl:px-8">
              <Link to="/service-times">Join Our Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 text-base xl:text-lg px-6 xl:px-8">
              <Link to="/contact">Experience God's Power</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 gradient-text max-sm:text-2xl">
              Our Mission
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              Transforming lives through worship, preaching, prayer, deliverance, and healing
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 xl:gap-8">
            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Spirit-Filled Worship</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Experience the presence of God through powerful worship and praise
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 xl:w-10 xl:h-10 text-accent" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Anointed Teaching</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Receive the Word of God that breaks every yoke and sets you free
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Healing & Deliverance</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Witness miracles as God heals and delivers by His mighty power
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 xl:w-10 xl:h-10 text-accent" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Community & Fellowship</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Join a loving family walking together in faith and purpose
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 max-sm:text-2xl">
              Walk in Your <span className="gradient-gold-text">God-Given Purpose</span>
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              We believe in empowering every believer to discover and fulfill their divine calling through the anointing that breaks every yoke
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
            <div>
              <img
                src={churchImage}
                alt="Church community fellowship"
                className="rounded-lg elegant-shadow w-full h-[300px] xl:h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl xl:text-3xl font-bold mb-3 text-primary max-sm:text-xl">Our Vision</h3>
                <p className="text-muted-foreground text-base xl:text-lg max-sm:text-sm">
                  To raise a generation of believers who walk in the fullness of God's power, demonstrating His love and authority in every sphere of life.
                </p>
              </div>
              <div>
                <h3 className="text-2xl xl:text-3xl font-bold mb-3 text-primary max-sm:text-xl">Core Beliefs</h3>
                <ul className="space-y-3 text-muted-foreground text-base xl:text-lg max-sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>The anointing of the Holy Spirit breaks every yoke</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Every believer is called to walk in divine purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>God's power is available for healing and deliverance today</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>We are called to be witnesses of His glory to the world</span>
                  </li>
                </ul>
              </div>
              <Button asChild size="lg" className="w-full xl:w-auto">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <img
  src={churchLogo}
  alt="Holy Ghost Power Anointed Church International Logo"
  className="w-16 h-16 xl:w-20 xl:h-20 mx-auto animate-pulse object-contain"
/>
          <h2 className="text-3xl xl:text-5xl font-bold mb-6 max-sm:text-2xl">
            Experience the Power of the Holy Spirit
          </h2>
          <p className="text-lg xl:text-xl mb-8 text-white/90 max-sm:text-base">
            Join us for life-transforming services where the presence of God moves powerfully
          </p>
          <div className="flex flex-col xl:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/service-times">View Service Times</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              <Link to="/contact">Request Prayer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}