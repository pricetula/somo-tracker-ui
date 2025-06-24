import { z } from "zod"

export const signinSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    code: z
        .string()
        .optional(),
    emailSent: z.boolean(),
}).refine(
    (data) => {
        // If email has been sent, code is required and must be 6 digits
        if (data.emailSent) {
            return data.code && data.code.length === 6 && /^\d{6}$/.test(data.code);
        }
        // If email hasn't been sent, code is not required
        return true;
    },
    {
        message: "Code must be exactly 6 digits which was sent to your email",
        path: ["code"],
    }
);

export type SigninSchema = z.infer<typeof signinSchema>
