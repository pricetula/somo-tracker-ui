import { APIError } from "better-auth/api"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Signin } from "@/components/page/signin"
import { SigninSchema } from "@/lib/schemas/signin"
import { ServerResponse } from "@/lib/types"

export default function Page() {
    return (
        <Signin />
    )
}