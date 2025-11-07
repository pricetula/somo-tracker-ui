import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete"
import { uri } from "./utils"

export async function deleteCohortStudentsByUserIDs(ids: string[]): Promise<void> {
    if (ids.length === 0) throw new Error("user ids required to delete cohort students")
    await authenticatedDelete({ uri: `${uri}/users`, body: { ids } })
}
