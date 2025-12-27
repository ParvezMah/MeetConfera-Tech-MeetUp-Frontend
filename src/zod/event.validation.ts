// zod/event.validation.ts
import { z } from "zod";

export const createEventZodSchema = z.object({
    eventName: z.string().min(1, "Event name is required"),
    description: z.string().optional(),
    date: z.string().min(1, "Event date is required"),
    maxParticipants: z.number().min(1, "Maximum participants must be at least 1"),
    minParticipants: z.number().min(1, "Minimum participants must be at least 1"),
    location: z.string().optional(),
    joiningFee: z.number().optional(),
    category: z.string().min(1, "Category is required"),
    hostId: z.string().min(1, "Host ID is required"),
    image: z.any().optional(),
});

export const updateEventZodSchema = z.object({
    eventName: z.string().min(1, "Event name is required").optional(),
    description: z.string().optional(),
    date: z.string().min(1, "Event date is required").optional(),
    maxParticipants: z.number().min(1, "Maximum participants must be at least 1").optional(),
    minParticipants: z.number().min(1, "Minimum participants must be at least 1").optional(),
    location: z.string().optional(),
    joiningFee: z.number().optional(),
    category: z.string().min(1, "Category is required").optional(),
    hostId: z.string().min(1, "Host ID is required").optional(),
});
