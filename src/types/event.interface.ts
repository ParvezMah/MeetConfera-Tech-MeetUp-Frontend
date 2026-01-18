// types/event.interface.ts

import { IHost } from "./host.interface";

export enum EventStatus {
  OPEN = "OPEN",
  FULLED = "FULLED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

export enum EventCategory {
  AI = "AI",
  MACHINE_LEARNING = "MACHINE_LEARNING",
  DATA_SCIENCE = "DATA_SCIENCE",
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT",
  CLOUD_COMPUTING = "CLOUD_COMPUTING",
  CYBER_SECURITY = "CYBER_SECURITY",
  BLOCKCHAIN = "BLOCKCHAIN",
  DEVOPS = "DEVOPS",
  GAMING = "GAMING",
  ROBOTICS = "ROBOTICS",
  STARTUPS = "STARTUPS",
  IOT = "IOT",
  SOFTWARE_ENGINEERING = "SOFTWARE_ENGINEERING",
  OTHER = "OTHER",
}

export interface IEvent {
  id: string;
  eventName: string;
  description?: string | null;
  // ISO string from backend
  date: string;
  location?: string | null;
  maxParticipants: number;
  minParticipants: number;
  joinedParticipants: number;
  joiningFee?: number | null;
  image?: string | null;
  status: EventStatus;
  category: EventCategory;
  hostId: string;
  host?: IHost;
  createdAt: string;
  updatedAt: string;
}
