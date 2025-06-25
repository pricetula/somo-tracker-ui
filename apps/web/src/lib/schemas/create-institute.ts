import { z } from "zod"

export const createInstituteSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(32, { message: "Name must be at most 32 characters" }),
    description: z
        .string()
        .min(1, { message: "Description is required" })
        .max(255, { message: "Description must be at most 255 characters" }),
    address: z
        .string()
        .min(1, { message: "Address is required" })
        .max(255, { message: "Address must be at most 255 characters" }),
    website: z
        .string()
        .min(1, { message: "Website is required" })
        .max(255, { message: "Website must be at most 255 characters" }),
    contactUser: z.object({
        email: z.string().email({ message: "Invalid email" }),
        phone: z.string().min(1, { message: "Phone is required" }),
        firstName: z
            .string()
            .min(1, { message: "First name is required" })
            .max(32, { message: "First name must be at most 32 characters" }),
        lastName: z
            .string()
            .min(1, { message: "Last name is required" })
            .max(32, { message: "Last name must be at most 32 characters" }),
        photoUrl: z.string().url({ message: "Invalid photo url" }),
    }),
})

export type CreateInstituteSchema = z.infer<typeof createInstituteSchema>
