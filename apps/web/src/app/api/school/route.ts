import { CreateSchoolSchema } from "@/features/school/components/create-school/form-schema";
import { createSchool } from "@/features/school/services/create-school";

export async function POST(request: Request) {
    try {
        // Get JSON data from request body
        const body: CreateSchoolSchema = await request.json();
        const data = await createSchool(body);
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to sign out" }), { status: 500 })
    }
}