import { Card, CardContent } from "@/components/ui/card";
import { Flame, Heart, Users, BookOpen, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">About Us</h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            Discover our heart, mission, and calling
          </p>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center mb-16 xl:mb-24">
            <div>
              <img
                src="church-worship-image.jpg"
                alt="Church worship service"
                className="rounded-lg elegant-shadow w-full h-[300px] xl:h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl xl:text-5xl font-bold mb-6 gradient-text max-sm:text-2xl">
                Who We Are
              </h2>
              <p className="text-base xl:text-lg text-muted-foreground mb-6 max-sm:text-sm">
                Holy Ghost Power Anointed Church International is a vibrant, spirit-filled community devoted to the teachings of Jesus Christ and the power of the Holy Spirit. We are a family of believers united by our passion for God's presence and our commitment to seeing lives transformed by His power.
              </p>
              <p className="text-base xl:text-lg text-muted-foreground mb-6 max-sm:text-sm">
                Our church was founded on the revelation that the anointing of the Holy Spirit breaks every yoke and sets captives free. We believe that every believer is called to walk in the fullness of God's power and purpose, demonstrating His love and authority in every area of life.
              </p>
              <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                Through worship, preaching, prayer, deliverance, and healing, we create an atmosphere where the Holy Spirit moves freely, touching hearts, healing bodies, and transforming lives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 mb-16 xl:mb-24">
            <Card className="elegant-shadow">
              <CardContent className="p-8 xl:p-12">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                </div>
                <h3 className="text-2xl xl:text-4xl font-bold mb-4 text-primary max-sm:text-xl">Our Mission</h3>
                <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                  To transform lives through worship, preaching, prayer, deliverance, and healing, empowering believers to walk in their God-given purpose and demonstrate the power of the Holy Spirit to the world.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow">
              <CardContent className="p-8 xl:p-12">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 xl:w-10 xl:h-10 text-accent" />
                </div>
                <h3 className="text-2xl xl:text-4xl font-bold mb-4 gradient-gold-text max-sm:text-xl">Our Vision</h3>
                <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                  To raise a generation of believers who walk in the fullness of God's power, demonstrating His love and authority in every sphere of life, and advancing His kingdom on earth as it is in heaven.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 max-sm:text-2xl">
              Our <span className="gradient-text">Core Beliefs</span>
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              The foundation of our faith and ministry
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 mb-16 xl:mb-24">
            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Flame className="w-6 h-6 xl:w-7 xl:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">The Anointing Breaks Every Yoke</h3>
                    <p className="text-muted-foreground max-sm:text-sm">
                      We believe in the power of the Holy Spirit's anointing to break every chain, destroy every yoke, and set captives free from bondage, sickness, and oppression.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 xl:w-7 xl:h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Divine Purpose for Every Believer</h3>
                    <p className="text-muted-foreground max-sm:text-sm">
                      Every believer is called to walk in their God-given purpose, equipped and empowered by the Holy Spirit to fulfill their unique destiny in Christ.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 xl:w-7 xl:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Healing & Deliverance Today</h3>
                    <p className="text-muted-foreground max-sm:text-sm">
                      God's power for healing and deliverance is available today. We believe in miracles, signs, and wonders as manifestations of His love and authority.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 xl:w-7 xl:h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Witnesses to the World</h3>
                    <p className="text-muted-foreground max-sm:text-sm">
                      We are called to be witnesses of His glory, demonstrating the love and power of God to our communities and to the ends of the earth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 xl:w-7 xl:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">The Authority of God's Word</h3>
                    <p className="text-muted-foreground max-sm:text-sm">
                      The Bible is the inspired, infallible Word of God, our final authority for faith and practice, and the foundation of all we believe and teach.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Flame className="w-6 h-6 xl:w-7 xl:h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">The Power of the Holy Spirit</h3>
                    <p className="text-muted-foreground max-sm:text-sm">
                      The Holy Spirit empowers believers for service, gifts them for ministry, and enables them to live victorious, supernatural lives in Christ.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/30 rounded-lg p-8 xl:p-12 text-center">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4 max-sm:text-xl">
              Join Our <span className="gradient-gold-text">Spirit-Filled Family</span>
            </h2>
            <p className="text-base xl:text-lg text-muted-foreground max-w-2xl mx-auto max-sm:text-sm">
              We invite you to become part of our community where you can grow in faith, discover your purpose, and experience the transforming power of God's presence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
