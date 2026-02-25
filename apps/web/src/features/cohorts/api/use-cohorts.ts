import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getCohorts, getCohort } from "@/features/cohorts/api/actions";

export const cohortsMeta = {
  queryKey: ["cohorts"] as const,
  queryFn: getCohorts,
};

export function useCohorts() {
  return useSuspenseQuery({
    queryKey: cohortsMeta.queryKey,
    queryFn: cohortsMeta.queryFn,
  });
}

export function cohortMeta(id: string) {
  return {
    queryKey: ["cohorts", id] as const,
    queryFn: () => getCohort(id),
  };
}

export function useCohort(id: string) {
  return useQuery(cohortMeta(id));
}
