import { EventCategory } from "./event.interface";
import { UserStatus } from "./user.interface";

export interface IHost {
  id?: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  password?: string;
  profilePhoto?: string | File;
  bio?: string;
  location?: string;
  interests?: EventCategory;
  status?: UserStatus;
  isVerified?: boolean;
  isDeleted?: boolean;
  averageRating?: number;
  joiningFee?: string;
  verificationNotes?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    email: string;
    role: string;
    status: UserStatus;
  };
  events?: Array<{
    id: string;
    eventName: string;
    date: string;
    status: string;
    participantsCount: number;
    joiningFee: number;
  }>;
}
