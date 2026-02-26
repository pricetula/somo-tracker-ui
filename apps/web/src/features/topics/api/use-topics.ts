import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getTopicsBySubject, getTopic } from "@/features/topics/api/actions";

export function topicsBySubjectMeta(subjectId: string) {
  return {
    queryKey: ["topics", "subject", subjectId] as const,
    queryFn: () => getTopicsBySubject(subjectId),
  };
}

export function useTopicsBySubject(subjectId: string) {
  return useSuspenseQuery(topicsBySubjectMeta(subjectId));
}

export function topicMeta(id: string) {
  return {
    queryKey: ["topics", id] as const,
    queryFn: () => getTopic(id),
  };
}

export function useTopic(id: string) {
  return useQuery(topicMeta(id));
}
