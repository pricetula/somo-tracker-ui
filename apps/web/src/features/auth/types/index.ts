import { z } from "zod";

export const sendMagicLinkSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    full_name: z.string().optional(),
});

export type SendMagicLinkInput = z.infer<typeof sendMagicLinkSchema>;
