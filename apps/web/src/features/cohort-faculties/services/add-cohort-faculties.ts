import { authenticatedPost } from "@/features/auth/utils/authenticated-post"
import { CohortFaculty } from "../types"
import { uri } from "./utils"

export async function addCohortFaculties(i: CohortFaculty[]): Promise<CohortFaculty[]> {
    if (i.length === 0) throw new Error("cohort faculties required to be added")
    const resp = await authenticatedPost({ uri, body: i })
    return await resp.json()
}
