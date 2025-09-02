import { setActiveSchool } from "@/features/me/services/set-active-school";

export async function PUT(request: Request) {
    try {
        // Get JSON data from request body
        const body: any = await request.json();
        const { data, error } = await setActiveSchool(body);
        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 })
        }
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to sign out" }), { status: 500 })
    }
}