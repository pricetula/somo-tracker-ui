import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { Cohort } from "../types";

export async function updateCohort(i: Cohort): Promise<Cohort> {
    const resp = await authenticatedPut({ uri: "/cohorts", body: i })
    return await resp.json()
}
