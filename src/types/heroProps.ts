import React from "react";

export interface HeroProps {
  onNavigate?: (page: string) => void;  // I will use it later when i need it
  isAuthenticated?: boolean;
  heroStats?: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  categories?: Array<{
    name: string;
    icon: string;
    count: number;
    color?: string;
  }>;
  topHosts?: Array<{
    name: string;
    events: number;
    rating: number;
    avatar: string;
  }>;
  testimonials?: Array<{
    name: string;
    role: string;
    content: string;
    avatar: string;
  }>;
}
