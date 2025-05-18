import { betterAuth } from "better-auth"
import { Pool } from "pg"
import { sendEmailVerification, sendPasswordReset } from "./email"

export const auth = betterAuth({
    emailVerification: {
        sendOnSignUp: true,
        requireEmailVerification: true,
        sendEmailVerification,
        sendPasswordReset,
    },
    emailAndPassword: {
        enabled: true
    },
    database: new Pool({
        connectionString: process.env.BETTER_AUTH_DB_URL,
    }),
})