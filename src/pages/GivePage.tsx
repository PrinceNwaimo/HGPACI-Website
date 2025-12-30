import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart,  Users, Globe, Flame } from "lucide-react";


export default function GivePage() {
  const givingOptions = [
    {
      title: "Tithes & Offerings",
      icon: Heart,
      description: "Support the ongoing ministry of the church through your faithful tithes and offerings. Your generosity enables us to continue spreading the gospel and serving our community.",
      scripture: "Bring the whole tithe into the storehouse... Test me in this, says the Lord Almighty. - Malachi 3:10",
    },
   
    {
      title: "Missions & Outreach",
      icon: Globe,
      description: "Partner with us in reaching the lost and serving communities locally and around the world. Your gifts support evangelism, mission trips, and humanitarian efforts.",
      scripture: "Go into all the world and preach the gospel to all creation. - Mark 16:15",
    },
   
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <Heart className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-4" />
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">Give</h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            Partner with us in advancing God's kingdom
          </p>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 gradient-text max-sm:text-2xl">
              Why We Give
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              Giving is an act of worship and obedience that demonstrates our trust in God and our commitment to His work
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 mb-16 xl:mb-24">
            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Worship</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Giving is a tangible expression of our love and gratitude to God for all He has done
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 xl:w-10 xl:h-10 text-accent" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Obedience</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  We honor God by following His command to bring our tithes and offerings into His house
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                </div>
                <h3 className="text-xl xl:text-2xl font-bold mb-3 max-sm:text-lg">Impact</h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  Your generosity enables us to reach more people and make a lasting difference in lives
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 max-sm:text-2xl">
              Ways to <span className="gradient-gold-text">Give</span>
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              Choose the giving option that best fits your heart and purpose
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 mb-16 xl:mb-24">
            {givingOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card
                  key={index}
                  className="elegant-shadow hover:glow-effect transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl xl:text-3xl max-sm:text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-base xl:text-lg max-sm:text-sm">
                      {option.description}
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <p className="text-sm xl:text-base italic text-muted-foreground max-sm:text-xs">
                        "{option.scripture}"
                      </p>
                    </div>
                    <Button className="w-full" size="lg">
                      Give to {option.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="elegant-shadow bg-muted/30 mb-16 xl:mb-24">
            <CardContent className="p-8 xl:p-12">
              <h3 className="text-2xl xl:text-4xl font-bold mb-6 text-center max-sm:text-xl">
                Other Ways to Give
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl xl:text-3xl">💳</span>
                  </div>
                  <h4 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Online Giving</h4>
                  <p className="text-muted-foreground text-sm xl:text-base max-sm:text-xs">
                    Give securely online through our website using your credit or debit card
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl xl:text-3xl">🏦</span>
                  </div>
                  <h4 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Bank Transfer</h4>
                  <p className="text-muted-foreground text-sm xl:text-base max-sm:text-xs">
                    Set up automatic transfers from your bank account for convenient recurring giving
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl xl:text-3xl">✉️</span>
                  </div>
                  <h4 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Mail</h4>
                  <p className="text-muted-foreground text-sm xl:text-base max-sm:text-xs">
                    Send checks payable to HGPACI to 75 Abam Street, Umuahia, Abia State, Nigeria.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary text-white rounded-lg p-8 xl:p-12 glow-effect">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
              <div>
                <h3 className="text-2xl xl:text-4xl font-bold mb-4 max-sm:text-xl">
                  God's Promise to Givers
                </h3>
                <p className="text-lg xl:text-xl mb-6 text-white/90 max-sm:text-base">
                  "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap. For with the measure you use, it will be measured to you."
                </p>
                <p className="text-base xl:text-lg text-accent font-semibold max-sm:text-sm">- Luke 6:38</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 xl:p-8">
                <h4 className="font-bold text-xl xl:text-2xl mb-4 max-sm:text-lg">Blessings of Giving</h4>
                <ul className="space-y-3 text-white/90 text-base xl:text-lg max-sm:text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>God opens the windows of heaven</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>He rebukes the devourer for your sake</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>You experience supernatural provision</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Your seed multiplies for harvest</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 xl:mt-24 text-center">
            <p className="text-base xl:text-lg text-muted-foreground max-w-2xl mx-auto max-sm:text-sm">
               Holy Ghost Power Anointed Church International is a registered nonprofit organization. For questions about giving, please contact our finance office at +2348063648007.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}