import { Role } from "@/features/user/types";
import { GetSchoolUsersInput } from "../types";

export function getSchoolUsersFilterFromSearchParam(searchParams: URLSearchParams): GetSchoolUsersInput {
    const roles: Role[] = []
    const roleparam = searchParams.get('roles')?.split?.(',')?.filter?.(Boolean)

    if (roleparam && roleparam?.length > 0) {
        for (const role of roleparam) {
            const r = role.toUpperCase()
            const n = r === 'STUDENT' && Role.STUDENT ||
                r === 'ADMIN' && Role.ADMIN ||
                r === 'FACULTY' && Role.FACULTY ||
                r === 'GUARDIAN' && Role.GUARDIAN ||
                false
            if (n) {
                roles.push(n)
            }
        }
    }

    return {
        roles,
        limit: parseInt(searchParams.get('limit') || '10', 10),
        searchTerm: searchParams.get('search_term') || "",
        lastSeenCreatedAt: searchParams.get('last_seen_created_at')
            ? new Date(searchParams.get('last_seen_created_at')!)
            : null,
        cohortIDs: searchParams.get('cohort_ids')?.split(',').filter(Boolean) || [],
    }
}