import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getSubjectsByYearGroup, getSubject } from "@/features/subjects/api/actions";

export function subjectsByYearGroupMeta(yearGroupId: string) {
  return {
    queryKey: ["subjects", "year-group", yearGroupId] as const,
    queryFn: () => getSubjectsByYearGroup(yearGroupId),
  };
}

export function useSubjectsByYearGroup(yearGroupId: string) {
  return useSuspenseQuery(subjectsByYearGroupMeta(yearGroupId));
}

export function subjectMeta(id: string) {
  return {
    queryKey: ["subjects", id] as const,
    queryFn: () => getSubject(id),
  };
}

export function useSubject(id: string) {
  return useQuery(subjectMeta(id));
}
