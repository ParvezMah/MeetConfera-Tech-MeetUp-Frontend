import z from "zod";

export const createUserZodSchema = z.object({
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
  location: z
    .string()
    .min(1, "Location is required"),
  profilePhoto: z
    .instanceof(File)
    .optional(),
});


export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .optional(),
  contactNumber: z
    .string()
    .min(10, "Contact Number must be at least 10 characters long")
    .optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  profilePhoto: z.instanceof(File).optional(),
});

