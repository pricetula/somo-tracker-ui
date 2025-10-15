import { z } from "zod"

export const createLearningInstituteSchema = z.object({
    institute_name: z
        .string()
        .trim()
        .min(1, { message: "Required." })
        .max(255, { message: "Cannot exceed 255 characters." }),
    school_education_system_id: z
        .string()
        .trim()
        .min(1, { message: "Education system is required." }),
    school_name: z
        .string()
        .trim()
        .min(1, { message: "School name is required." }),
    school_description: z
        .string()
        .trim()
        .optional(),
    school_address: z
        .string()
        .trim()
        .min(1, { message: "School address is required." }),
    user_email: z
        .email({ message: "Valid email address is required." }),
    user_phone: z
        .string()
        .trim()
        .optional(),
    user_first_name: z
        .string()
        .trim()
        .min(1, { message: "First name required." }),
    user_last_name: z
        .string()
        .trim()
        .min(1, { message: "Last name required." }),
    user_photo_url: z
        .string()
        .trim()
        .optional(),
})

export type CreateLearningInstituteSchema = z.infer<typeof createLearningInstituteSchema>
