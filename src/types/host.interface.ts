export interface IHost {
  id?: string;
  organization?: string;
  isDeleted: boolean;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
    password: string;
    profilePhoto?: File | string;
    contactNumber: string;
    location?: string;
  };
  events?: {
    joiningFee?: number;
  };
}
