import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Heart, Users, Megaphone, Flame } from "lucide-react";

export default function MinistriesPage() {
  const ministries = [
    {
      name: "Worship Ministry",
      icon: Music,
      description: "Our worship team leads the congregation into the presence of God through spirit-filled praise and worship. We believe that worship is a powerful weapon that ushers in breakthrough and transformation.",
      focus: [
        "Leading dynamic worship services",
        "Training worship leaders and musicians",
        "Creating an atmosphere for God's presence",
        "Prophetic worship and intercession",
      ],
      image: "worship-ministry-image.jpg",
    },
    {
      name: "Prayer & Intercession",
      icon: Flame,
      description: "The prayer ministry is the powerhouse of our church. We gather regularly to intercede for our community, nation, and world, believing that prayer changes everything and moves the hand of God.",
      focus: [
        "Corporate prayer gatherings",
        "24/7 prayer chain",
        "Intercessory prayer training",
        "Prayer for healing and breakthrough",
      ],
      image: "prayer-ministry-image.jpg",
    },
    {
      name: "Deliverance & Healing",
      icon: Heart,
      description: "This ministry is dedicated to seeing people set free from bondage and healed from sickness. We operate in the authority of Jesus Christ to break chains and release God's healing power.",
      focus: [
        "Deliverance sessions and counseling",
        "Healing prayer ministry",
        "Inner healing and restoration",
        "Training in spiritual warfare",
      ],
      image: "healing-ministry-image.jpg",
    },
    {
      name: "Youth Ministry",
      icon: Users,
      description: "We are passionate about raising up the next generation to walk in the power and purpose of God. Our youth ministry provides a safe, fun environment where young people can encounter God and grow in their faith.",
      focus: [
        "Weekly youth services and activities",
        "Mentorship and discipleship",
        "Youth conferences and camps",
        "Leadership development",
      ],
      image: "youth-ministry-image.jpg",
    },
    {
      name: "Outreach & Evangelism",
      icon: Megaphone,
      description: "We are called to be witnesses of God's love and power to the world. Our outreach ministry takes the gospel beyond the church walls through community service, evangelism, and missions.",
      focus: [
        "Community outreach programs",
        "Street evangelism",
        "Mission trips and partnerships",
        "Compassion and social justice initiatives",
      ],
      image: "outreach-ministry-image.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <Users className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-4" />
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">Our Ministries</h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            Serving God and empowering believers to fulfill their calling
          </p>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 gradient-text max-sm:text-2xl">
              Get Involved
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto max-sm:text-base">
              Discover your place in the body of Christ and use your gifts to advance God's kingdom
            </p>
          </div>

          <div className="space-y-12 xl:space-y-16">
            {ministries.map((ministry, index) => {
              const IconComponent = ministry.icon;
              const isEven = index % 2 === 0;

              return (
                <Card
                  key={index}
                  className="elegant-shadow hover:glow-effect transition-all duration-300 overflow-hidden"
                >
                  <div className={`grid grid-cols-1 xl:grid-cols-2 gap-0 ${!isEven ? "xl:grid-flow-dense" : ""}`}>
                    <div className={`${!isEven ? "xl:col-start-2" : ""}`}>
                      <img
                        src={ministry.image}
                        alt={ministry.name}
                        className="w-full h-[250px] xl:h-full object-cover"
                      />
                    </div>
                    <div className={`p-6 xl:p-12 ${!isEven ? "xl:col-start-1 xl:row-start-1" : ""}`}>
                      <CardHeader className="p-0 mb-6">
                        <div className="w-16 h-16 xl:w-20 xl:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl xl:text-4xl max-sm:text-xl">{ministry.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground mb-6 text-base xl:text-lg max-sm:text-sm">
                          {ministry.description}
                        </p>
                        <div>
                          <h4 className="font-semibold text-lg xl:text-xl mb-4 text-primary max-sm:text-base">
                            Ministry Focus:
                          </h4>
                          <ul className="space-y-3">
                            {ministry.focus.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-accent mt-1 flex-shrink-0">✓</span>
                                <span className="text-muted-foreground max-sm:text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 xl:mt-24 bg-primary text-white rounded-lg p-8 xl:p-12 text-center glow-effect">
            <Flame className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-6" />
            <h3 className="text-2xl xl:text-4xl font-bold mb-4 max-sm:text-xl">
              Discover Your <span className="gradient-gold-text">Calling</span>
            </h3>
            <p className="text-lg xl:text-xl mb-8 text-white/90 max-w-2xl mx-auto max-sm:text-base">
              God has placed unique gifts and talents within you. Join one of our ministries and use your gifts to make an eternal impact.
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Serve</h4>
                <p className="text-white/90 text-sm xl:text-base max-sm:text-xs">
                  Use your gifts to serve God and bless others
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Grow</h4>
                <p className="text-white/90 text-sm xl:text-base max-sm:text-xs">
                  Develop your skills and deepen your faith
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Impact</h4>
                <p className="text-white/90 text-sm xl:text-base max-sm:text-xs">
                  Make a lasting difference in people's lives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
