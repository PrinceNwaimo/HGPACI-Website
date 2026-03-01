import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Flame, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { submitMembershipApplication, type MembershipFormData } from '@/db/membershipApi';

const MembershipFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MembershipFormData>({
    defaultValues: {
      name: '',
      marital_status: '',
      contact: '',
      how_did_you_know: '',
      country: '',
      state: '',
      wish_to_be_member: true,
    },
  });

  const onSubmit = async (data: MembershipFormData) => {
    try {
      setIsSubmitting(true);
      await submitMembershipApplication(data);
      
      toast({
        title: 'Application Submitted!',
        description: 'Thank you for your interest in joining HGPACI. We will review your application and contact you soon.',
      });

      form.reset();
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Membership Application
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join our spirit-filled community and experience the transforming power of God
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-primary" />
                Membership Form
              </CardTitle>
              <CardDescription>
                Please fill out the form below to apply for membership at Holy Ghost Power Anointed Church International
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Marital Status */}
                  <FormField
                    control={form.control}
                    name="marital_status"
                    rules={{ required: 'Marital status is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your marital status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Contact */}
                  <FormField
                    control={form.control}
                    name="contact"
                    rules={{
                      required: 'Contact information is required',
                      pattern: {
                        value: /^[\w\s@.+-]+$/,
                        message: 'Please enter a valid phone number or email',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact (Phone or Email) *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number or email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* How did you know HGPACI */}
                  <FormField
                    control={form.control}
                    name="how_did_you_know"
                    rules={{ required: 'Please select how you heard about us' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you know about HGPACI? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="someone_introduced">Someone introduced me</SelectItem>
                            <SelectItem value="through_internet">Through the Internet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Country */}
                  <FormField
                    control={form.control}
                    name="country"
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Residence *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* State */}
                  <FormField
                    control={form.control}
                    name="state"
                    rules={{ required: 'State is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State of Residence *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Wish to be a member */}
                  <FormField
                    control={form.control}
                    name="wish_to_be_member"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Do you wish to be a member of HGPACI? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === 'true')}
                            value={field.value ? 'true' : 'false'}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Yes, I wish to become a member
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                No, I'm just inquiring
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/')}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="mt-8 text-center text-muted-foreground">
            <p className="mb-2">
              After submitting your application, our team will review it and contact you within 3-5 business days.
            </p>
            <p>
              For immediate assistance, please contact us at{' '}
              <a href="tel:5557778888" className="text-primary hover:underline">
                (+234)8027033783
              </a>
              {' '}or{' '}
              <a href="mailto:info@hgpaci.org" className="text-primary hover:underline">
                info@hgpaci.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipFormPage;
