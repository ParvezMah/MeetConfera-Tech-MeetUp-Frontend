/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
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

  // const myEvents = await getMyEvents()
  // console.log("My Events : ", myEvents)   // Successful

  // const eventId = "ae5934f8-d2dc-45ce-a00b-25cdbe3076a0"; // Replace with actual event ID
  // const AllParticipantsOfThisEvents = await getAllParticipantsOfThisEvents(eventId);
  // console.log("All Participants Of This Events : ", AllParticipantsOfThisEvents);   // Successful


  // const eventPayments = await getEventPayments(eventId);
  // console.log("Event Payments : ", eventPayments);   // Successful


  // const eventId = "832c8bf7-8142-4594-ad98-ad7d431acc8c"; // Replace with actual event ID
  // const data = {eventName: "DevOps & Cloud - 2026"}; // Example data to update
  // const updatedEvent = await updateEvent(eventId, data); 
  // // You are not authorized to updateEvent
  // console.log("Updated Event : ", updatedEvent); 


  // const eventId = "248a8fcb-866d-4b29-9875-b1ded97dc0b2"; // Replace with actual event ID
  // const deletedEvent = await deleteEvent(eventId);
  // console.log("Deleted Event : ", deletedEvent);   // Successful


  // const hostId = "88458e7b-449b-4399-911a-ec11bc31d466";
  // const data = {contactNumber: "1234567890"} // Replace with actual host ID
  // const updatedHost = await updateHost(hostId, data);
  // console.log("Updated Host : ", updatedHost);   // Successful


  // const hostId = "3c75a1fa-8376-4d20-b82d-9fd7d892be14"; // Replace with actual host ID
  // const deletedHost = await deleteHost(hostId);
  // console.log("Deleted Host : ", deletedHost);   // Successful


  // const hostId = "d6c991f2-66cb-4716-a18e-6bfd3a4ab6fd";
  // const softDeletedHost = await softDeleteHost(hostId);
  // console.log("Soft Deleted Host : ", softDeletedHost);   // Successful

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
