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
        .optional(),
    contactUserEmail: z.string().email({ message: "Invalid email" }),
    contactUserPhone: z.string().min(1, { message: "Phone is required" }),
    contactUserFirstName: z
        .string()
        .min(1, { message: "First name is required" })
        .max(32, { message: "First name must be at most 32 characters" }),
    contactUserLastName: z
        .string()
        .min(1, { message: "Last name is required" })
        .max(32, { message: "Last name must be at most 32 characters" }),
    contactUserPhotoUrl: z.string().url({ message: "Invalid photo url" }),
})

export type CreateInstituteSchema = z.infer<typeof createInstituteSchema>
