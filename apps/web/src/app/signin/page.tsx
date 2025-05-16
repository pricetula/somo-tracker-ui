import { APIError } from "better-auth/api"
import { Signin } from "@/components/page/signin"
import { auth } from "@/lib/auth"
import { SigninSchema } from "@/lib/schemas/signin"
import { ServerResponse } from "@/lib/types"

export default function Page() {
    async function onSubmit(body: SigninSchema): Promise<ServerResponse> {
        "use server"
        try {
            const resp = await auth.api.signInEmail({
                body,
                asResponse: true,
            })
            if (resp.status !== 200) {
                const error = await resp.json()
                return {
                    errorCode: error.code,
                    message: error.message,
                }
            }
            return {}
        } catch (error) {
            if (error instanceof APIError) {
                return {
                    errorCode: error.name,
                    message: error.message,
                }
            }
            return {
                errorCode: "unknown",
                message: "An unknown error occurred",
            }
        }
    }

    return (
        <Signin onSubmit={onSubmit} />
    )
}