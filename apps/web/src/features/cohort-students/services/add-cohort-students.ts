import { authenticatedPost } from "@/features/auth/utils/authenticated-post"
import { CohortStudent } from "../types"
import { uri } from "./utils"

export async function addCohortStudents(i: CohortStudent[]): Promise<CohortStudent[]> {
    if (i.length === 0) throw new Error("cohort students required to be added")
    const resp = await authenticatedPost({ uri, body: i })
    return await resp.json()
}
