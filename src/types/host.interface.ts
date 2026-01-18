import { IEvent } from "./event.interface";
import { UserInfo } from "./user.interface";

export interface IHost {
  id?: string;
  name: string;
  email: string;
  contactNumber: string;
  profilePhoto?: string | File;
  isDeleted?: boolean;
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: UserInfo;
  events?: IEvent[];
  reviews?: {
    rating: number;
    comment?: string;
  }[];
}
