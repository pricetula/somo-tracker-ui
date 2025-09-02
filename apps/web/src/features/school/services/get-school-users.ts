import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ActionResponse } from "@/shared/types/actions";
import { SchoolUser } from "../types";
import { Role } from "@/shared/types/user";

type GetSchoolUserResponse = ActionResponse<SchoolUser[]>

export async function getSchoolUsers(
    roles: Role[] = [],
    limit: number = 10,
    searchTerm: string = "",
    lastSeenCreatedAt: Date | null = null,
    cohortIDs: string[] = [],
): Promise<GetSchoolUserResponse> {
    // Initialize response variable to return
    let r: GetSchoolUserResponse = { success: false, data: [], error: "" }

    try {
        const url = new URL('/schools/users');
        const params = url.searchParams;

        if (roles && roles.length > 0) {
            params.set('roles', roles.join(','));
        }

        if (limit > 0) {
            params.set('limit', limit.toString());
        }

        if (searchTerm) {
            params.set('search_term', searchTerm);
        }

        if (lastSeenCreatedAt) {
            params.set('last_seen_created_at', lastSeenCreatedAt.toISOString());
        }

        if (cohortIDs && cohortIDs.length > 0) {
            params.set('cohort_ids', cohortIDs.join(','));
        }

        // Attempt to get schools
        const resp = await authenticatedGet({ uri: `${url.pathname}${url.search}` })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.text()
            r.error = err || "Failed to get schools"
            return r
        }

        // Get data from response and set to response variable
        r.success = true
        r.data = await resp.json()
    } catch (err) {
        if (err instanceof Error) {
            r.error = err.message
        } else {
            r.error = "Unknown error, failed to get schools"
        }
    }

    // Return result
    return r
}