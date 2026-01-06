// types/event.interface.ts

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
  description?: string;
  date: string; // ISO string format
  maxParticipants: number;
  minParticipants: number;
  status: string;
  image?: string;
  hostId: string;
  createdAt: string;
  updatedAt: string;
  joiningFee: number;
  location?: string;
  category: EventCategory;
  host?: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    rating?: number;
  };
  participants?: {
  id: string;
  userId: string;
  status: string;
  user?: {
    name: string;
    email: string;
  };
}
}

// Optional relations
// host?: {
//   id: string;
//   name: string;
//   email: string;
//   contactNumber?: string;
// };



// payments?: Array<{
//   id: string;
//   amount: number;
//   status: string;
//   createdAt: string;
// }>;

// reviews?: Array<{
//   id: string;
//   rating: number;
//   comment?: string;
//   userId: string;
//   createdAt: string;
// }>;
// }

// // For form submission
// export interface IEventFormData {
//   eventName: string;
//   description?: string;
//   date: string;
//   maxParticipants: number;
//   minParticipants: number;
//   joiningFee?: number;
//   location?: string;
//   category: EventCategory;
//   hostId: string;
//   image?: File | string;
// }

// // For API responses
// export interface IEventResponse {
//   success: boolean;
//   message: string;
//   data?: IEvent | IEvent[];
//   formData?: Partial<IEventFormData>;
//   errors?: Record<string, string[]>;
// }

// // For table/list display
// export interface IEventTableItem {
//   id: string;
//   eventName: string;
//   category: EventCategory;
//   date: string;
//   location?: string;
//   maxParticipants: number;
//   currentParticipants: number;
//   status: EventStatus;
//   joiningFee?: number;
//   hostName: string;
// }

// // For filters/search
// export interface IEventFilters {
//   category?: EventCategory;
//   status?: EventStatus;
//   dateFrom?: string;
//   dateTo?: string;
//   location?: string;
//   search?: string;
// }

// // For participant management
// export interface IEventParticipant {
//   id: string;
//   userId: string;
//   eventId: string;
//   status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'ATTENDED';
//   createdAt: string;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     contactNumber?: string;
//   };
// }

// // For statistics/dashboard
// export interface IEventStats {
//   totalEvents: number;
//   upcomingEvents: number;
//   completedEvents: number;
//   cancelledEvents: number;
//   totalParticipants: number;
//   averageParticipants: number;
//   totalRevenue?: number;
//   byCategory: Record<EventCategory, number>;
//   byStatus: Record<EventStatus, number>;
// }
