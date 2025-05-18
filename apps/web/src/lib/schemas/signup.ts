import { z } from "zod"
import { checkPasswordStrength } from "./util"

export const signupSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(32, { message: "Name must be at most 32 characters" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: checkPasswordStrength(),
    confirmPassword: z
        .string()
        .min(1, { message: "Confirm password is required" })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
    })
export type SignupSchema = z.infer<typeof signupSchema>
