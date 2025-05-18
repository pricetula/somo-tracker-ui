import { auth } from "@/lib/auth"
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    // Extract the body from the request this should be a JSON object of { email, password }
    const body = await req.json()

    // Define a variable to hold the response
    let resp: any = null

    try {
        // Call the signInEmail method from the auth object to sign in the user
        resp = await auth.api.signInEmail({
            body,
            asResponse: true,
            headers: req.headers,
        })
    } catch (error: any) {
        // If an error occurs, return a JSON response with the error message
        return NextResponse.json(
            {
                errorCode: error.name,
                message: error.message,
            },
            {
                status: 500,
            }
        )
    }

    // Check if the response status is not 200 (OK)
    if (resp.status !== 200) {
        const error = await resp.json()
        return NextResponse.json(
            {
                errorCode: error.code,
                message: error.message,
            },
            {
                status: resp.status,
            }
        )
    }

    // If the response is OK, check if there is a set-cookie header and set it in the response
    const setCookie = resp.headers.get('set-cookie')

    // Create a new response object with the JSON data from the response
    const response = NextResponse.json(await resp.json(), {
        status: resp.status,
    })

    // If there is a set-cookie header, set it in the response headers
    if (setCookie) {
        response.headers.set('set-cookie', setCookie)
    }

    return response
}
