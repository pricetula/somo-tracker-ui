import { getMe } from "@/features/me/services/get-me";

export async function GET() {
    const me = await getMe();

    return new Response(JSON.stringify(me), { status: 200 })
}