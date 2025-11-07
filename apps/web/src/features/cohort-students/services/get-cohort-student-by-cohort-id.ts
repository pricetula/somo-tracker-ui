import { authenticatedGet } from "@/features/auth/utils/authenticated-get"
import { CohortStudent } from "../types"
import { uri } from "./utils"

export async function getCohortStudentByCohortID(id: string): Promise<CohortStudent[]> {
    if (!id) throw new Error("id required to get cohort faculty")
    const resp = await authenticatedGet({ uri: `${uri}/${id}` })
    return await resp.json()
}
