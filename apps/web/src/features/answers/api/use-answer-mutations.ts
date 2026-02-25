import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnswers, updateAnswer, deleteAnswers } from "@/features/answers/api/actions";
import type { AddAnswerRequest, UpdateAnswerRequest } from "@/features/answers/types";

export function useCreateAnswers(questionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddAnswerRequest[]) => createAnswers(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["answers", "question", questionId] }),
  });
}

export function useUpdateAnswer(questionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateAnswerRequest) => updateAnswer(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["answers", "question", questionId] }),
  });
}

export function useDeleteAnswers(questionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => deleteAnswers(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["answers", "question", questionId] }),
  });
}
