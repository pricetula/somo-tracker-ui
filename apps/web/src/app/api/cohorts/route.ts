import { getCohorts } from "@/features/cohort/services/get-cohorts";

export async function GET() {
    const cohorts = await getCohorts();

    return new Response(JSON.stringify(cohorts), { status: 200 })
}