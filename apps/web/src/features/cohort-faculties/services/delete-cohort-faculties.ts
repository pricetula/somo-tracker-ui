import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete"
import { CohortFaculty } from "../types"
import { uri } from "./utils"

export async function deleteCohortFaculties(body: CohortFaculty[]): Promise<void> {
    if (body.length === 0) throw new Error("cohort faculties required to delete")
    await authenticatedDelete({ uri, body })
}
