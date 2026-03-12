import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSchoolUsers } from "./fetch-school-users";

export const SCHOOL_USERS_PAGE_SIZE = 20;

export interface SchoolUsersFilters {
    search?: string;
    role?: string;
}

export function schoolUsersQueryKey(filters: SchoolUsersFilters = {}) {
    return ["school-users", "list", filters] as const;
}

export function useInfiniteSchoolUsers(filters: SchoolUsersFilters = {}) {
    return useInfiniteQuery({
        queryKey: schoolUsersQueryKey(filters),
        queryFn: ({ pageParam }) =>
            fetchSchoolUsers({ ...filters, limit: SCHOOL_USERS_PAGE_SIZE, offset: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const fetched = allPages.flatMap((p) =>
                p.success ? (p.data?.items ?? []) : []
            ).length;
            const total = lastPage.success ? (lastPage.data?.total_count ?? 0) : 0;
            return fetched < total ? fetched : undefined;
        },
    });
}
