import { auth } from "@/lib/auth"
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()

    const resp = await auth.api.signInEmail({
        body,
        asResponse: true,
        headers: req.headers,
    })

    const setCookie = resp.headers.get('set-cookie')

    const response = NextResponse.json(await resp.json(), {
        status: resp.status,
    })

    if (setCookie) {
        response.headers.set('set-cookie', setCookie)
    }

    return response
}
