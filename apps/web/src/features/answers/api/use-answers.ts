import { useSuspenseQuery } from "@tanstack/react-query";
import { getAnswersByQuestion } from "@/features/answers/api/actions";

export function answersByQuestionMeta(questionId: string) {
  return {
    queryKey: ["answers", "question", questionId] as const,
    queryFn: () => getAnswersByQuestion(questionId),
  };
}

export function useAnswersByQuestion(questionId: string) {
  return useSuspenseQuery(answersByQuestionMeta(questionId));
}
