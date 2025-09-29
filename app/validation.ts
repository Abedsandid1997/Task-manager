import { z } from "zod";

export const taskValidation = z.object({
  title: z.string().min(1, "Title is required").max(55, "Title is too long"),
  description: z
    .string()
    .min(10, "Description is too short")
    .max(65535, "Description is too long"),
});

export const taskUpdateValidation = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title is too long")
    .optional(),
  description: z
    .string()
    .min(10, "Description is too short")
    .max(65535, "Description is too long")
    .optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  userId: z.string().optional().nullable(),
});

export const createUserValidation = z.object({
  name: z.string().min(1, "Name is required").max(55, "Name is too long"),
  email: z.email(),
  password: z.string().min(8),
});
