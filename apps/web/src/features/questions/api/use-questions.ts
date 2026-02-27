import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchQuestionsByTopic, fetchQuestion } from "./fetch-questions";

export function questionsByTopicQueryKey(topicId: string) {
  return ["questions", "topic", topicId] as const;
}

export function useQuestionsByTopic(topicId: string) {
  return useSuspenseQuery({
    queryKey: questionsByTopicQueryKey(topicId),
    queryFn: () => fetchQuestionsByTopic(topicId),
  });
}

export function questionQueryKey(id: string) {
  return ["questions", id] as const;
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: questionQueryKey(id),
    queryFn: () => fetchQuestion(id),
  });
}
