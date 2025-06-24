import { z } from "zod"

export const verifyCodeSchema = z.object({
    code: z
        .string()
        .length(6, { message: "Code must be 6 digits" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
})

export type VerifyCodeSchema = z.infer<typeof verifyCodeSchema>
