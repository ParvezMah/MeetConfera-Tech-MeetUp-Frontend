/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createEventZodSchema, updateEventZodSchema } from "@/zod/event.validation";

/**
 * CREATE EVENT
 * API: POST /events
 */
export async function createEvent(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        eventName: formData.get("eventName") as string,
        description: formData.get("description") as string,
        date: formData.get("date") as string,
        maxParticipants: parseInt(formData.get("maxParticipants") as string),
        minParticipants: parseInt(formData.get("minParticipants") as string),
        location: formData.get("location") as string,
        joiningFee: formData.get("joiningFee") 
            ? parseInt(formData.get("joiningFee") as string) 
            : undefined,
        category: formData.get("categories") as string,
        hostId: formData.get("hostId") as string,
        image: formData.get("file") as File,
    };

    const validatedPayload = zodValidator(validationPayload, createEventZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }

    // Parse categories from JSON string
    let categories: string[] = [];
    try {
        const categoriesStr = formData.get("categories") as string;
        categories = JSON.parse(categoriesStr);
    } catch (error) {
        // If not JSON, use as single category
        const category = formData.get("categories") as string;
        categories = category ? [category] : [];
    }

    const backendPayload = {
        eventName: validatedPayload.data.eventName,
        description: validatedPayload.data.description,
        date: validatedPayload.data.date,
        maxParticipants: validatedPayload.data.maxParticipants,
        minParticipants: validatedPayload.data.minParticipants,
        location: validatedPayload.data.location,
        joiningFee: validatedPayload.data.joiningFee,
        category: categories[0] || "", // Take first category since event has single category field
        hostId: validatedPayload.data.hostId,
    };

    const newFormData = new FormData()
    newFormData.append("data", JSON.stringify(backendPayload))
    if (formData.get("file")) {
        newFormData.append("file", formData.get("file") as Blob)
    }

    try {
        const response = await serverFetch.post("/events", {
            body: newFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create event error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create event',
            formData: validationPayload
        };
    }
}

/**
 * GET ALL EVENTS
 * API: GET /events?queryParams
 */
export async function getEvents(queryString?: string) {
    try {
        const response = await serverFetch.get(`/events$${queryString ? `?$${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * GET EVENT BY ID
 * API: GET /events/:id
 */
export async function getEventById(id: string) {
    try {
        const response = await serverFetch.get(`/events/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * UPDATE EVENT
 * API: PATCH /events/:id
 */
export async function updateEvent(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        eventName: formData.get("eventName") as string,
        description: formData.get("description") as string,
        date: formData.get("date") as string,
        maxParticipants: formData.get("maxParticipants") 
            ? parseInt(formData.get("maxParticipants") as string) 
            : undefined,
        minParticipants: formData.get("minParticipants") 
            ? parseInt(formData.get("minParticipants") as string) 
            : undefined,
        location: formData.get("location") as string,
        joiningFee: formData.get("joiningFee") 
            ? parseInt(formData.get("joiningFee") as string) 
            : undefined,
        category: formData.get("categories") as string,
        hostId: formData.get("hostId") as string,
    };

    // Parse categories for update
    let categories: string[] = [];
    let removedCategories: string[] = [];
    
    try {
        const categoriesStr = formData.get("categories") as string;
        const removeCategoriesStr = formData.get("removeCategories") as string;
        
        categories = categoriesStr ? JSON.parse(categoriesStr) : [];
        removedCategories = removeCategoriesStr ? JSON.parse(removeCategoriesStr) : [];
        
        // Since event has single category, handle accordingly
        if (categories.length > 0) {
            validationPayload.category = categories[0];
        }
    } catch (error) {
        // If not JSON, use as single category
        const category = formData.get("categories") as string;
        validationPayload.category = category;
    }

    const validation = zodValidator(validationPayload, updateEventZodSchema);
    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        };
    }
    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    try {
        const response = await serverFetch.patch(`/events/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update event error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update event',
            formData: validationPayload
        };
    }
}

/**
 * SOFT DELETE EVENT
 * API: DELETE /events/soft/:id
 */
export async function softDeleteEvent(id: string) {
    try {
        const response = await serverFetch.delete(`/events/soft/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * HARD DELETE EVENT
 * API: DELETE /events/:id
 */
export async function deleteEvent(id: string) {
    try {
        const response = await serverFetch.delete(`/events/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * GET EVENTS BY HOST
 * API: GET /events/host/:hostId
 */
export async function getEventsByHost(hostId: string, queryString?: string) {
    try {
        const response = await serverFetch.get(`/events/host/$${hostId}$${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

/**
 * UPDATE EVENT STATUS
 * API: PATCH /events/:id/status
 */
export async function updateEventStatus(id: string, status: string) {
    try {
        const response = await serverFetch.patch(`/events/${id}/status`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update event status error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update event status',
        };
    }
}
