import { Role } from "@/features/user/types";
import { GetSchoolUsersState } from "../types";

export function getSchoolUsersFilterFromSearchParam(searchParams: URLSearchParams): GetSchoolUsersState {
    const roles = converRoleStringToArray(searchParams.get('roles') || '')

    return {
        roles,
        searchTerm: searchParams.get('search_term') || "",
        lastSeenCreatedAt: searchParams.get('last_seen_created_at')
            ? new Date(searchParams.get('last_seen_created_at')!)
            : null,
        cohortIDs: searchParams.get('cohort_ids')?.split(',').filter(Boolean) || [],
    }
}

export function converRoleStringToArray(rolestring: string): Role[] {
    if (!rolestring) return []

    const roles: Role[] = []

    for (const role of rolestring.split(',').filter?.(Boolean)) {
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

    return roles
}