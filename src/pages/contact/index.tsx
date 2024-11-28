import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    alert('Message sent successfully!');
  };

  return (
    <PageTransition>
      <div className="container py-12">
        <h1 className="mb-8 font-serif text-3xl font-bold">Contact Us</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Send us a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Have a question? We'd love to hear from you. Send us a message and
                we'll respond as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register('firstName')}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register('lastName')}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={5}
                  {...register('message')}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You can also reach us through these channels:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    support@vintagecameras.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Monday - Friday, 9am - 6pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    123 Camera Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
