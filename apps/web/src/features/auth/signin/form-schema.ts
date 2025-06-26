import { z } from "zod"

export const signinSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .trim()
        .toLowerCase()
        .email("Invalid email address format.")
        .max(255, { message: "Email cannot exceed 255 characters." }),
})

export type SigninSchema = z.infer<typeof signinSchema>