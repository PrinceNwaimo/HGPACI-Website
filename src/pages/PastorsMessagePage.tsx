import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function SermonsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <BookOpen className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-4" />
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">
            Message from the Pastor
          </h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            A word of welcome and encouragement
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="elegant-shadow">
            <CardContent className="p-8 xl:p-12">
              <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-center xl:items-start">
                
                {/* Pastor Image */}
                <div className="flex-shrink-0">
                  <img
                    src="/Pastor Ogbonna 1.jpeg"
                    alt="Bishop Ogbonna Onyekachi"
                    className="w-56 h-56 rounded-full object-cover mx-auto "
                  />
                </div>

                {/* Message */}
                <div>
                  <h2 className="text-2xl xl:text-3xl font-bold mb-4">
                    Greetings in the name of our Lord and Savior Jesus Christ!
                  </h2>

                  <div className="space-y-4 text-muted-foreground text-base xl:text-lg leading-relaxed">
                    <p>
                      It is with great joy and humility that I welcome you to
                      Holy Ghost Power Anointed Church International. Here, we
                      are more than just a church—we are a family united by
                      faith, love, and the transforming power of the Holy Spirit.
                    </p>

                    <p>
                      Our mission is to raise a people of power, purpose, and
                      purity who are ready to take the Gospel to the nations.
                      We believe in the full manifestation of the Holy Spirit
                      through deliverance, healing, prophecy, and breakthrough.
                      At every service, we expect and experience the
                      supernatural move of God.
                    </p>

                    <p>
                      Whether you are seeking salvation, restoration, healing,
                      or simply a deeper relationship with God, you are welcome
                      here. My prayer is that as you connect with us, you will
                      encounter the life-changing presence of God, and your
                      life will never remain the same.
                    </p>

                    <p>
                      May the Lord bless you and keep you. We look forward to
                      worshiping with you.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="mt-8">
                    <p className="font-semibold text-lg">
                      In His service,
                    </p>
                    <p className="font-bold text-xl mt-2">
                      Bishop Ogbonna Onyekachi
                    </p>
                    <p className="text-muted-foreground">
                      Senior Pastor
                    </p>
                    <p className="text-muted-foreground">
                      Holy Ghost Power Anointed Church International
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
