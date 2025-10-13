import { getEducationSystems } from "@/features/education-system/services/get-education-system"

export async function GET() {
    const education_systems = await getEducationSystems();

    return new Response(JSON.stringify(education_systems), { status: 200 })
}