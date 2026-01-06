export interface IParticipant {
  id?: string;
  userId: string;
  eventId: string;
  joinedAt: string;
  status: "JOINED" | "CANCELLED" | "REJECTED" | "WAITING";
  user: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | File;
    contactNumber?: string;
    location?: string
  };
}
