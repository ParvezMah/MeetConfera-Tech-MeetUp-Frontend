export interface IAdmin {
  id?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber: string;
    location?: string;
  };
}
