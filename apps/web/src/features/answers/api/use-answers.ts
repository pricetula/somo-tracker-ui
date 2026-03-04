import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAnswersByQuestion } from "./fetch-answers";

export function answersByQuestionQueryKey(questionId: string) {
  return ["answers", "question", questionId] as const;
}

export function useAnswersByQuestion(questionId: string) {
  return useSuspenseQuery({
    queryKey: answersByQuestionQueryKey(questionId),
    queryFn: () => fetchAnswersByQuestion(questionId),
  });
}
