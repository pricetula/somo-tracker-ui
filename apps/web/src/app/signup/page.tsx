import { APIError } from "better-auth/api"
import { Signup } from "@/components/page/signup"
import { auth } from "@/lib/auth"
import { SignupSchema } from "@/lib/schemas/signup"
import { ServerResponse } from "@/lib/types"

export default function Page() {
    async function onSubmit(body: SignupSchema): Promise<ServerResponse> {
        "use server"
        try {
            const resp = await auth.api.signUpEmail({
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
        <Signup onSubmit={onSubmit} />
    )
}