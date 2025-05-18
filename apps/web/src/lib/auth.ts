import { betterAuth } from "better-auth"
import { Pool } from "pg"
import { sendEmailVerification } from "./email"

export const auth = betterAuth({
    emailVerification: {
        sendOnSignUp: true,
        requireEmailVerification: true,
        sendEmailVerification,
    },
    emailAndPassword: {
        enabled: true
    },
    database: new Pool({
        connectionString: process.env.BETTER_AUTH_DB_URL,
    }),
})