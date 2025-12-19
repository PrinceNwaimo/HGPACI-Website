import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  requestType: string;
};

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      requestType: "general",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Contact form submitted:", data);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] xl:h-[400px] flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-10 text-center px-4">
          <Mail className="w-16 h-16 xl:w-20 xl:h-20 text-accent mx-auto mb-4" />
          <h1 className="text-4xl xl:text-6xl font-bold text-white mb-4 max-sm:text-3xl">Contact Us</h1>
          <p className="text-lg xl:text-xl text-white/90 max-sm:text-base">
            We'd love to hear from you and answer any questions
          </p>
        </div>
      </section>

      <section className="py-16 xl:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 mb-16 xl:mb-24">
            <div>
              <h2 className="text-3xl xl:text-5xl font-bold mb-6 gradient-text max-sm:text-2xl">
                Get In Touch
              </h2>
              <p className="text-base xl:text-lg text-muted-foreground mb-8 max-sm:text-sm">
                Whether you have questions, need prayer, or want to learn more about our church, we're here for you. Fill out the form and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                <Card className="elegant-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Our Location</h3>
                        <p className="text-muted-foreground max-sm:text-sm">
                          123 Spirit Avenue<br />
                          Faith City, FC 12345
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="elegant-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Phone</h3>
                        <p className="text-muted-foreground max-sm:text-sm">
                          (555) 777-8888
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="elegant-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Email</h3>
                        <p className="text-muted-foreground max-sm:text-sm">
                          info@hgpaci.org
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="elegant-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg xl:text-xl mb-2 max-sm:text-base">Office Hours</h3>
                        <p className="text-muted-foreground max-sm:text-sm">
                          Monday - Friday: 9:00 AM - 5:00 PM<br />
                          Saturday: 10:00 AM - 2:00 PM<br />
                          Sunday: Closed (Join us for service!)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="elegant-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl xl:text-3xl max-sm:text-xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        rules={{ required: "Subject is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <FormControl>
                              <Input placeholder="What is this regarding?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <Label>Request Type</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant={form.watch("requestType") === "general" ? "default" : "outline"}
                            onClick={() => form.setValue("requestType", "general")}
                            className="w-full"
                          >
                            General Inquiry
                          </Button>
                          <Button
                            type="button"
                            variant={form.watch("requestType") === "prayer" ? "default" : "outline"}
                            onClick={() => form.setValue("requestType", "prayer")}
                            className="w-full"
                          >
                            Prayer Request
                          </Button>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        rules={{ required: "Message is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us how we can help you..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-primary text-white rounded-lg p-8 xl:p-12 text-center glow-effect">
            <h3 className="text-2xl xl:text-4xl font-bold mb-4 max-sm:text-xl">
              Need Immediate <span className="gradient-gold-text">Prayer?</span>
            </h3>
            <p className="text-lg xl:text-xl mb-8 text-white/90 max-w-2xl mx-auto max-sm:text-base">
              If you need urgent prayer, please call our prayer line at (555) 777-8888 or visit us during service times. We're here to stand with you in faith.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
