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

interface HostDashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const HostDashboardPage = async ({ searchParams }: HostDashboardPageProps) => {


const eventId = "1d82bee4-e0e0-443c-ba2d-224cde113653"; // Event owned by this host

const updateData = {
  "eventName": "Next.js Meetup Updated 4",
  "status": "OPEN",
  "minParticipants": 10,
  "maxParticipants": 50
};
const updatedEvent = await updateEvent(eventId, updateData);
console.log("Updated Event Response:", updatedEvent);



  return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Host Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your events and track your performance
        </p>
      </div>
  );
};

export default HostDashboardPage;
