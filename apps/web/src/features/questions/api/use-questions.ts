import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getQuestionsByTopic, getQuestion } from "@/features/questions/api/actions";

export function questionsByTopicMeta(topicId: string) {
  return {
    queryKey: ["questions", "topic", topicId] as const,
    queryFn: () => getQuestionsByTopic(topicId),
  };
}

export function useQuestionsByTopic(topicId: string) {
  return useSuspenseQuery(questionsByTopicMeta(topicId));
}

export function questionMeta(id: string) {
  return {
    queryKey: ["questions", id] as const,
    queryFn: () => getQuestion(id),
  };
}

export function useQuestion(id: string) {
  return useQuery(questionMeta(id));
}
