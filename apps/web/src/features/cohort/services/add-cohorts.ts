import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { CohortInput, Cohort } from "../types";

export async function addCohorts(i: CohortInput[]): Promise<Cohort[]> {
    if (i.length === 0) throw new Error("cohort details required to be added")
    const resp = await authenticatedPost({ uri: "/cohorts", body: i })
    return await resp.json()
}
