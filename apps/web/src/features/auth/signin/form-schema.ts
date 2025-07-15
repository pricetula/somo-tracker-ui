import { z } from "zod"

export const signinSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: "Required." })
        .toLowerCase()
        .email("Invalid email address format.")
        .max(255, { message: "Cannot exceed 255 characters." }),
    code: z
        .string()
        .trim()
        .optional(),
    emailSent: z.boolean(),
})
    .refine(
        (data) => {
            // If email has been sent, code is required and must be 6 digits
            if (data.emailSent) {
                return data.code && data.code.length === 6 && /^\d{6}$/.test(data.code);
            }
            // If email hasn't been sent, code is not required for validation
            return true;
        },
        {
            message: "Code must be exactly 6 digits which was sent to your email",
            path: ["code"],
        }
    )

export type SigninSchema = z.infer<typeof signinSchema>