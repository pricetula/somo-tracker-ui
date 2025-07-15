import { z } from "zod"

export const meSchema = z.object({
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

export type MeSchema = z.infer<typeof meSchema>
