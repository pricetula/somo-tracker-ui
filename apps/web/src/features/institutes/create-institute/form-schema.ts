import { z } from "zod"

export const contactUserSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: "Required." })
        .toLowerCase()
        .email("Invalid email address format.")
        .max(255, { message: "Cannot exceed 255 characters." }),
    first_name: z
        .string()
        .trim()
        .min(1, { message: "Required." })
        .max(50, { message: "Cannot exceed 50 characters." }),
    last_name: z
        .string()
        .trim()
        .min(1, { message: "Required." })
        .max(50, { message: "Cannot exceed 50 characters." }),
    phone: z
        .string()
        .trim()
        .optional(),
    photo_url: z.string().trim().optional(),
})

export type ContactUserSchema = z.infer<typeof contactUserSchema>

export const createInstituteSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Required." })
        .max(255, { message: "Cannot exceed 255 characters." }),
    description: z
        .string()
        .trim()
        .min(1, { message: "Required." }),
    address: z
        .string()
        .trim()
        .min(1, { message: "Required." })
        .max(255, { message: "Cannot exceed 255 characters." }),
    website: z
        .string()
        .trim()
        .optional(),
})

export type CreateInstituteSchema = z.infer<typeof createInstituteSchema>
