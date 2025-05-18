import { z } from "zod"

export function checkPasswordStrength() {
    return z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(32, { message: "Password must be at most 32 characters" })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
            message: "Password must contain at least one special character",
        })
}