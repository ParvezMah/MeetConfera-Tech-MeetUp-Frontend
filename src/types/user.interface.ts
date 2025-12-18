import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";
import { IHost } from "./host.interface";
import { IParticipant } from "./participant.interface";

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

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  bio?: string;
  location?: string;
  interests?: EventCategory;
  admin?: IAdmin;
  host?: IHost;
  participant?: IParticipant;
  createdAt: string;
  updatedAt: string;
}
