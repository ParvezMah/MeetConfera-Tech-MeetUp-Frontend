// zod/hosts.validation.ts
import { z } from "zod";

// Common validation schemas
const phoneRegex = /^(\+?88)?01[3-9]\d{8}$/;

export const createHostZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    contactNumber: z.string()
        .min(1, "Contact number is required")
        .regex(phoneRegex, "Invalid Bangladeshi phone number format"),
    address: z.string().min(1, "Address is required"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters"),
    profilePhoto: z.any().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    interests: z.string().optional(),
});

export const updateHostZodSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    contactNumber: z.string()
        .min(1, "Contact number is required")
        .regex(phoneRegex, "Invalid Bangladeshi phone number format")
        .optional(),
    address: z.string().min(1, "Address is required").optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    interests: z.string().optional(),
    profilePhoto: z.any().optional(),
});

// For password change (if needed)
export const changeHostPasswordZodSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string()
        .min(6, "New password must be at least 6 characters")
        .max(50, "New password must be less than 50 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// For host status update
export const updateHostStatusZodSchema = z.object({
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
});

// For host verification
export const verifyHostZodSchema = z.object({
    isVerified: z.boolean(),
    verificationNotes: z.string().optional(),
});

// For host search/filter
export const hostFilterZodSchema = z.object({
    search: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
    location: z.string().optional(),
    isVerified: z.boolean().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
});
