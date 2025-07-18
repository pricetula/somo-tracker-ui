import { z } from "zod"

export const invitationsSchema = z.object({
    emails: z.array(
        z.object({
            value: z.string().email({ message: "Invalid email address." }).min(1, { message: "Email is required." })
        })
    ).min(1, { message: "At least one email is required." }),
});

export type InvitationsSchema = z.infer<typeof invitationsSchema>;