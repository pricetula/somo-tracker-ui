import { authenticatedGet } from "@/features/auth/utils/authenticated-get"
import { CohortFaculty } from "../types"
import { uri } from "./utils"

export async function getCohortFacultyByCohortID(id: string): Promise<CohortFaculty> {
    if (!id) throw new Error("id required to get cohort faculty")
    const resp = await authenticatedGet({ uri: `${uri}/cohort/${id}` })
    return await resp.json()
}
