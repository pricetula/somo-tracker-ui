import { z } from "zod"

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
    website: z
        .string()
        .trim()
        .optional(),
    email: z
        .string()
        .trim()
        .email({ message: "Invalid email." }),
    first_name: z
        .string()
        .trim()
        .min(1, { message: "First name required." }),
    last_name: z
        .string()
        .trim()
        .min(1, { message: "Last name required." }),
})

export type CreateInstituteSchema = z.infer<typeof createInstituteSchema>
