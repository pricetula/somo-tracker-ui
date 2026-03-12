import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchSubjectsByYearGroup, fetchSubject } from "./fetch-subjects";

export function subjectsByYearGroupQueryKey(yearGroupId: string) {
    return ["subjects", "year-group", yearGroupId] as const;
}

export function useSubjectsByYearGroup(yearGroupId: string) {
    return useSuspenseQuery({
        queryKey: subjectsByYearGroupQueryKey(yearGroupId),
        queryFn: () => fetchSubjectsByYearGroup(yearGroupId),
    });
}

export function subjectQueryKey(id: string) {
    return ["subjects", id] as const;
}

export function useSubject(id: string) {
    return useQuery({
        queryKey: subjectQueryKey(id),
        queryFn: () => fetchSubject(id),
    });
}
