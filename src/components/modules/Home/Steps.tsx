import { Search, Users, CalendarDays, TicketCheck, MonitorPlay, Wallet, MapPinned, Rocket } from "lucide-react";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const steps = [
  {
    icon: Search,
    title: "Discover Meetups",
    description: "Find tech meetups by topic, city, or community.",
  },
  {
    icon: Users,
    title: "Explore Speakers",
    description: "Check speaker profiles and event details.",
  },
  {
    icon: CalendarDays,
    title: "Register for Events",
    description: "Save your seat for free or paid tech meetups.",
  },
  {
    icon: TicketCheck,
    title: "Manage Your Tickets",
    description: "Download, view, or update your event tickets anytime.",
  },
  {
    icon: MonitorPlay,
    title: "Join Live Sessions",
    description: "Attend online or offline sessions easily.",
  },
  {
    icon: Wallet,
    title: "Secure Payments",
    description: "Pay for premium events using safe payment methods.",
  },
  {
    icon: MapPinned,
    title: "Attend & Network",
    description: "Connect with developers, founders, and tech communities.",
  },
  {
    icon: Rocket,
    title: "Grow Your Career",
    description: "Learn, network, and accelerate your tech journey.",
  },
];

const StepCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
    const bgColors = [
        'bg-blue-50', 'bg-pink-50', 'bg-green-50', 'bg-yellow-50',
        'bg-pink-50', 'bg-blue-50', 'bg-yellow-50', 'bg-green-50'
    ];
    const textColors = [
        'text-blue-500', 'text-pink-500', 'text-green-500', 'text-yellow-500',
        'text-pink-500', 'text-blue-500', 'text-yellow-500', 'text-green-500'
    ];

    return (
        <Card className={`${bgColors[index % 8]}`}>
            <CardContent className="p-4">
                 <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${textColors[index % 8]} bg-white shadow-sm`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">{title}</h3>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


const Steps = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">How Our Platform Works</h2>
          <p className="text-muted-foreground mt-4 ">
            Our Platform let you connect with the tech meetups, simplifies registration and enhances your networking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {steps.map((step, index) => (
                <StepCard key={index} {...step} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
