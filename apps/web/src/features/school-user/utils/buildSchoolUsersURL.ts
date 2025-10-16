import { GetSchoolUsersInput } from "../types";

export function buildSchoolUsersURL(baseURL: string, params: GetSchoolUsersInput) {
    const url = new URL(baseURL);

    const searchParams = url.searchParams;

    if (params.roles && params.roles.length > 0) {
        searchParams.set('roles', params.roles.join(','));
    }

    if (params.limit > 0) {
        searchParams.set('limit', params.limit.toString());
    }

    if (params.searchTerm) {
        searchParams.set('search_term', params.searchTerm);
    }

    if (params.lastSeenCreatedAt) {
        searchParams.set('last_seen_created_at', params.lastSeenCreatedAt.toISOString());
    }

    if (params.cohortIDs && params.cohortIDs.length > 0) {
        searchParams.set('cohort_ids', params.cohortIDs.join(','));
    }

    return url.toString();
}