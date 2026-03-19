import { z } from "zod";

export const sendMagicLinkSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    full_name: z.string().optional(),
});

export type SendMagicLinkInput = z.infer<typeof sendMagicLinkSchema>;

export const verifyMagicLinkSchema = z.object({
    token: z.string().min(1, "Token is required"),
});

export type VerifyMagicLinkInput = z.infer<typeof verifyMagicLinkSchema>;
