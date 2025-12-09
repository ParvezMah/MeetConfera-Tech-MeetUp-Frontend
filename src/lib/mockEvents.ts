export interface Event {
  id: string;
  title: string;
  date: string;
  participants: number;
  maxParticipants: number;
  image: string;
  status: "open" | "full";
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "React Advanced Workshop",
    date: "2025-12-15",
    participants: 45,
    maxParticipants: 50,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop",
    status: "open",
  },
  {
    id: "2",
    title: "AI & Machine Learning Seminar",
    date: "2025-12-18",
    participants: 50,
    maxParticipants: 50,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    status: "full",
  },
  {
    id: "3",
    title: "Startup Pitch Session",
    date: "2025-12-20",
    participants: 20,
    maxParticipants: 25,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    status: "open",
  },
  {
    id: "4",
    title: "Hackathon Weekend",
    date: "2025-12-22",
    participants: 30,
    maxParticipants: 35,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    status: "open",
  },
];
