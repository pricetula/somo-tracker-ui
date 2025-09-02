import { z } from "zod"

export const createSchoolSchema = z.object({
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
    education_system_id: z
        .string()
        .trim()
        .min(1, { message: "Required." }),
})

export type CreateSchoolSchema = z.infer<typeof createSchoolSchema>
