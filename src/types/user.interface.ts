import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";
import { IHost } from "./host.interface";
import { IParticipant } from "./participant.interface";
import { EventCategory } from "./event.interface";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  bio?: string;
  location?: string;
  interests?: EventCategory;
  admin?: IAdmin;
  host?: IHost;
  participant?: IParticipant;
  createdAt: string;
  updatedAt: string;
}
