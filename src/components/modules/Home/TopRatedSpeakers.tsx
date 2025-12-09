import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SarahJohnson from "../../../../public/images/Sarah Johnson.jpg"
import MichaelLee from "../../../../public/images/Michael.jpg"
import BilyMonton from "../../../../public/images/Bily Monton.jpg"

export const Speakers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior AI Researcher",
    rating: 4.9,
    reviews: 98,
    image: SarahJohnson,
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Cloud Solutions Architect",
    rating: 4.8,
    reviews: 120,
    image: MichaelLee,
  },
  {
    id: 3,
    name: "Bily Monton",
    role: "Full Stack Developer",
    rating: 4.9,
    reviews: 85,
    image: BilyMonton,
  },
];

const SpeakerCard = ({ Speaker }: { Speaker: typeof Speakers[0] }) => {
    return (
        <Card className="text-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-blue-50/50 items-center p-6">
                <Image 
                    src={Speaker.image} 
                    alt={Speaker.name} 
                    width={100} 
                    // height={96}
                    className="w-full border-4 border-white shadow-md"
                />
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="text-lg">{Speaker.name}</CardTitle>
                <p className="text-primary font-medium mt-1">{Speaker.role}</p>
                <div className="flex items-center justify-center my-3 text-sm">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="ml-2 text-foreground font-semibold">{Speaker.rating}</span>
                    <span className="ml-2 text-muted-foreground">({Speaker.reviews} reviews)</span>
                </div>
            </CardContent>
             <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                <Button variant="outline">View Profile</Button>
                <Button>Book Now</Button>
            </CardFooter>
        </Card>
    )
}

const TopRatedSpeakers = () => {
  return (
    <section className="bg-blue-50/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Our Top Rated Speakers</h2>
          <p className="text-muted-foreground mt-4">
            Access to medical experts from various specialities, ready to provide you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {Speakers.map(Speaker => <SpeakerCard key={Speaker.name} Speaker={Speaker} />)}
        </div>
        
        <div className="text-center mt-12">
            <Button size="lg">View All Doctors</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedSpeakers;
