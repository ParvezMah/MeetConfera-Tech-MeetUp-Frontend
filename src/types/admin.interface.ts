export interface IAdmin {
  id?: string;
  name: string;
  email: string;
  contactNumber: string;
  profilePhoto?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    role?: string;
  };
}










// export interface IAdmin {
//   id?: string;
//   user?: {
//     name?: string;
//     email?: string;
//     profilePhoto?: string | null;
//     contactNumber?: string;
//     location?: string;
//   };
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }
