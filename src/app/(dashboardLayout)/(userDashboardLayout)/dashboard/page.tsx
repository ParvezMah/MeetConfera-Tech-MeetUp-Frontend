/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  createEvent,
  deleteEvent, 
  deleteHost, 
  getAllParticipantsOfThisEvents, 
  getEventPayments, 
  getMyEvents, 
  softDeleteHost, 
  updateEvent, 
  updateHost 
} from "@/services/host/hostService";

interface UserDashBoardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UserDashBoardPage = async ({ searchParams }: UserDashBoardPageProps) => {

  return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your user and track your Revenue
        </p>
      </div>
  );
};

export default UserDashBoardPage;
