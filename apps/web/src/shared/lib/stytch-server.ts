import * as stytch from 'stytch';

export const stytchServerClient = new stytch.B2BClient({
    project_id: process.env.STYTCH_PROJECT_ID!,
    secret: process.env.STYTCH_SECRET!,
});