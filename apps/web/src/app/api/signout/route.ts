import { deleteAuthCookie } from "@/features/auth/utils/delete-auth-cookie"

export async function POST() {
    try {
        await deleteAuthCookie()
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to sign out" }), { status: 500 })
    }
}