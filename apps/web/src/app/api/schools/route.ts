import { getSchools } from "@/features/school/services/get-school";

export async function GET() {
    const schools = await getSchools();

    return new Response(JSON.stringify(schools), { status: 200 })
}