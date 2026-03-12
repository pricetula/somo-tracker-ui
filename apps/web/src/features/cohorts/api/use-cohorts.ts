import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchCohorts, fetchCohort } from "./fetch-cohorts";

export const cohortsQueryKey = ["cohorts"] as const;

export function useCohorts() {
    return useSuspenseQuery({
        queryKey: cohortsQueryKey,
        queryFn: fetchCohorts,
    });
}

export function cohortQueryKey(id: string) {
    return ["cohorts", id] as const;
}

export function useCohort(id: string) {
    return useQuery({
        queryKey: cohortQueryKey(id),
        queryFn: () => fetchCohort(id),
    });
}
