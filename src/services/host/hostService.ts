"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export interface IEventFormData {
  eventName: string;
  category: string;
  description: string;
  date: string;
  location: string;
  joiningFee: number;
  capacity: number;
  status?: string;
}

export interface IEventFilters {
  category?: string;
  status?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export interface IHostData {
  name?: string;
  email?: string;
  contactNumber?: string;
  bio?: string;
  location?: string;
}

// ----------------- Event APIs -----------------
export async function getMyEvents(filters?: IEventFilters) {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.append("category", filters.category.toUpperCase());
    if (filters?.status) queryParams.append("status", filters.status.toUpperCase());
    if (filters?.fromDate) queryParams.append("startDate", filters.fromDate);
    if (filters?.toDate) queryParams.append("endDate", filters.toDate);
    if (filters?.page) queryParams.append("page", String(filters.page));
    if (filters?.limit) queryParams.append("limit", String(filters.limit));

    const endpoint = `/hosts/my-events${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const res = await serverFetch.get(endpoint);
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("getMyEvents error:", error);
    return { success: false, data: [], message: error?.message || "Failed to fetch events" };
  }
}

export async function getAllParticipantsOfThisEvents(eventId: string) {
  try {
    const res = await serverFetch.get(`/hosts/${eventId}/participants`);
    return await res.json();
  } catch (error: any) {
    console.error("getAllParticipantsOfThisEvents:", error);
    return { success: false, data: [], message: error?.message || "Failed to fetch participants" };
  }
}

export async function getEventPayments(eventId: string) {
  try {
    const res = await serverFetch.get(`/hosts/${eventId}/payments`);
    return await res.json();
  } catch (error: any) {
    console.error("getEventPayments error:", error);
    return { success: false, data: [], message: error?.message || "Failed to fetch payments" };
  }
}

// export async function createEvent(data: IEventFormData, file?: File) {
//   try {
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(data));
//     if (file) formData.append("file", file);

//     const res = await serverFetch.post("/hosts/create-event", { body: formData });
//     return await res.json();
//   } catch (error: any) {
//     console.error("createEvent error:", error);
//     return { success: false, message: error?.message || "Failed to create event" };
//   }
// }

export async function updateEvent(eventId: string, data: Partial<IEventFormData>, file?: File) {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (file) formData.append("file", file as Blob);

    const res = await serverFetch.patch(`/hosts/update-event/${eventId}`, { body: formData });
    return await res.json();
  } catch (error: any) {
    console.error("updateEvent error:", error);
    return { success: false, message: error?.message || "Failed to update event" };
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const res = await serverFetch.delete(`/hosts/${eventId}`);
    return await res.json();
  } catch (error: any) {
    console.error("deleteEvent error:", error);
    return { success: false, message: error?.message || "Failed to delete event" };
  }
}

// ----------------- Host APIs -----------------
export async function updateHost(hostId: string, data: IHostData) {
  try {
    const res = await serverFetch.patch(`/hosts/update-host/${hostId}`, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error: any) {
    console.error("updateHost error:", error);
    return { success: false, message: error?.message || "Failed to update host" };
  }
}

export async function deleteHost(hostId: string) {
  try {
    const res = await serverFetch.delete(`/hosts/${hostId}`);
    return await res.json();
  } catch (error: any) {
    console.error("deleteHost error:", error);
    return { success: false, message: error?.message || "Failed to delete host" };
  }
}

export async function softDeleteHost(hostId: string) {
  try {
    const res = await serverFetch.delete(`/hosts/soft-delete/${hostId}`);
    return await res.json();
  } catch (error: any) {
    console.error("softDeleteHost error:", error);
    return { success: false, message: error?.message || "Failed to soft delete host" };
  }
}
