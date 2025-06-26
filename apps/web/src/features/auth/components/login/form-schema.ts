import { z } from "zod"

export const signinSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Required" })
        .email("Not in correct format"),
})

export type SigninSchema = z.infer<typeof signinSchema>