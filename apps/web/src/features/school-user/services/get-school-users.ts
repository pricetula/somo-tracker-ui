import { authenticatedGet } from "@/features/auth/utils/authenticated-get"
import { GetSchoolUsersState, SchoolUser } from "@/features/school-user/types"
import { buildSchoolUsersURL } from "../utils"

export async function getSchoolUsers(i: GetSchoolUsersState): Promise<SchoolUser[]> {
    const uri = buildSchoolUsersURL('/school-users', i)

    // Attempt to get school users
    const resp = await authenticatedGet({ uri })

    // Check if response is not ok and set error
    if (!resp.ok) {
        const err = await resp.text()
        throw err || "Failed to get schools"
    }

    return await resp.json()
}