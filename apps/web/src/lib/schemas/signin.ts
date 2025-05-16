import { z } from "zod"
import { checkPasswordStrength } from "./util"

export const signinSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: checkPasswordStrength(),
})

export type SigninSchema = z.infer<typeof signinSchema>
