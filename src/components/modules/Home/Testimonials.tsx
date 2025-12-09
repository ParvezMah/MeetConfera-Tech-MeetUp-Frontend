import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import SarahJohnson from "../../../../public/images/Sarah Johnson.jpg"
import MichaelLee from "../../../../public/images/Michael.jpg"
import BilyMonton from "../../../../public/images/Bily Monton.jpg"


const testimonials = [
  {
    name: 'Robert Fox',
    role: 'User',
    image: SarahJohnson,
    quote: 'The event was incredibly well-organized. I learned new skills, met amazing developers, and felt inspired to improve my craft..',
    rating: 4,
  },
  {
    name: 'Jane Cooper',
    role: 'User',
    image: MichaelLee,     
    quote: 'A seamless experience from discovering the meetup to joining the sessions. The platform makes registration, reminders, and follow-ups extremely convenient.',
    rating: 5,
  },
  {
    name: 'Wade Warren',
    role: 'User',
    image: BilyMonton,     
    quote: 'I highly recommend this platform. The speakers were top-notch, and the networking opportunities helped me connect with mentors and industry leaders.',
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-card py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">What Our Users Says</h2>
          <p className="text-muted-foreground mt-4">
            We are committed to providing you with the best medical and healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-background relative">
               <CardContent className="p-8">
                <Quote className="absolute top-4 left-4 text-primary" size={48} />
                <div className="relative z-10">
                  <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        width={64} 
                        height={64} 
                        className="rounded-full"
                      />
                      <div className="ml-4">
                          <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                          <div className="flex mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                              ))}
                          </div>
                      </div>
                  </div>
                </div>
               </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
