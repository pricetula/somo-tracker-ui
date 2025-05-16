import { betterAuth } from "better-auth"
import { Pool } from "pg"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: new Pool({
        connectionString: process.env.BETTER_AUTH_DB_URL,
    }),
})