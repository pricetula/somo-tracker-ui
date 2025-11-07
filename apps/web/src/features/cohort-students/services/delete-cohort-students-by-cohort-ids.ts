import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete"
import { uri } from "./utils"

export async function deleteCohortStudentsByCohortIDs(ids: string[]): Promise<void> {
    if (ids.length === 0) throw new Error("cohort ids required to delete cohort students")
    await authenticatedDelete({ uri: `${uri}/cohorts`, body: { ids } })
}
