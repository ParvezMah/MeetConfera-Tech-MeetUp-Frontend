import { z } from "zod";

export const createHostZodSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  contactNumber: z
    .string()
    .min(1, "Contact Number is required")
    .min(10, "Contact Number must be at least 10 characters long"),
  organization: z
    .string()
    .min(3, "Organization must be at least 3 characters long")
    .optional(),
  profilePhoto: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Profile photo must be a valid file",
    }),
});


export const updateHostZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  contactNumber: z
    .string()
    .min(10, "Contact Number must be at least 10 characters long")
    .optional(),
  organization: z
    .string()
    .min(3, "Organization must be at least 3 characters long")
    .optional(),
  profilePhoto: z
    .union([z.string(), z.instanceof(File)])
    .optional(),

});

