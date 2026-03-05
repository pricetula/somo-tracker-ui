import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExamSessions, updateExamSession, deleteExamSessions } from "@/features/exam-sessions/api/actions";
import type { AddExamSessionRequest, UpdateExamSessionRequest } from "@/features/exam-sessions/types";

export function useCreateExamSessions(examId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddExamSessionRequest[]) => createExamSessions(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exam-sessions", "exam", examId] }),
  });
}

export function useUpdateExamSession(examId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateExamSessionRequest) => updateExamSession(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exam-sessions", "exam", examId] }),
  });
}

export function useDeleteExamSessions(examId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => deleteExamSessions(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exam-sessions", "exam", examId] }),
  });
}
