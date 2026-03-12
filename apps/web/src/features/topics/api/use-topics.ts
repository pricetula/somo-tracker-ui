import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchTopicsBySubject, fetchTopic } from "./fetch-topics";

export function topicsBySubjectQueryKey(subjectId: string) {
    return ["topics", "subject", subjectId] as const;
}

export function useTopicsBySubject(subjectId: string) {
    return useSuspenseQuery({
        queryKey: topicsBySubjectQueryKey(subjectId),
        queryFn: () => fetchTopicsBySubject(subjectId),
    });
}

export function topicQueryKey(id: string) {
    return ["topics", id] as const;
}

export function useTopic(id: string) {
    return useQuery({
        queryKey: topicQueryKey(id),
        queryFn: () => fetchTopic(id),
    });
}
