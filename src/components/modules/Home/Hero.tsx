"use client";
import { Calendar, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { mockEvents } from "@/lib/mockEvents";
import { HeroProps } from "@/types/heroProps";

export function Hero({
  onNavigate,
  isAuthenticated = false,
  heroStats = [
    { value: "2,847", label: "Active Users" },
    { value: "489", label: "Events Hosted" },
    { value: "4.8★", label: "Avg Rating", icon: <Star className="size-6 fill-yellow-400 stroke-yellow-400" /> },
  ],
  categories = [
    { name: "Tech Workshops", icon: "💻", count: 145, color: "bg-blue-100 dark:bg-blue-900" },
    { name: "Hackathons", icon: "🚀", count: 89, color: "bg-purple-100 dark:bg-purple-900" },
    { name: "Seminars", icon: "🎓", count: 124, color: "bg-green-100 dark:bg-green-900" },
    { name: "Pitch Sessions", icon: "💡", count: 67, color: "bg-orange-100 dark:bg-orange-900" },
  ],
  topHosts = [
    { name: "Jhankar Mahabub", events: 24, rating: 4.9, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
    { name: "Sumit Saha", events: 18, rating: 4.8, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    { name: "Abdur Rakib", events: 21, rating: 4.9, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  ],
  testimonials = [
    { name: "Alex Rivera", role: "Software Engineer", content: "EventHub helped me find amazing tech meetups and connect with like-minded developers.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
    { name: "Jessica Lee", role: "Startup Founder", content: "As a host, EventHub makes it incredibly easy to organize events and manage participants.", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop" },
    { name: "David Kim", role: "Product Designer", content: "I've attended over 15 events through EventHub. The quality of events and people I've met is outstanding.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
  ],
}: HeroProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 py-20 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary">🎉 Join 10,000+ Active Members</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Connect Through <span className="text-primary">Amazing Events</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover tech workshops, hackathons, seminars, and pitch sessions. Build your network, learn new skills, and grow your career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate(isAuthenticated ? "events" : "register")}>
                {isAuthenticated ? "Explore Events" : "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("become-host")}>Become a Host</Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              {heroStats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" alt="People at event" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover upcoming events that match your interests and skills</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockEvents.map(event => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg cursor-pointer" onClick={() => onNavigate(`event-${event.id}`)}>
              <div className="h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <Badge variant={event.status === "open" ? "success" : "warning"} className="mb-2">{event.status === "open" ? "Open" : "Full"}</Badge>
                <h3 className="font-semibold mb-2 line-clamp-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> <span>{event.date}</span></div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4" /> <span>{event.participants}/{event.maxParticipants} joined</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-muted/30 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Find events that match your interests and career goals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Card key={category.name} className="hover:shadow-lg cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} events</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Hosts */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top-Rated Hosts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Learn from the best event organizers in the community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topHosts.map(host => (
            <Card key={host.name} className="hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Avatar className="mx-auto mb-4">
                  <AvatarImage src={host.avatar} alt={host.name} />
                  <AvatarFallback>{host.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-2">{host.name}</h3>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{host.events} events</span></div>
                  <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span>{host.rating}</span></div>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from real members</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <Card key={testimonial.name}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">Join thousands of professionals connecting through amazing events</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" variant="secondary" onClick={() => onNavigate(isAuthenticated ? "events" : "register")}>
            {isAuthenticated ? "Explore Events" : "Sign Up Free"} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate("become-host")}>
            Become a Host
          </Button>
        </div>
      </section>
    </div>
  );
}
