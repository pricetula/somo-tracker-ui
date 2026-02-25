import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExams, updateExam, deleteExams } from "@/features/exams/api/actions";
import type { AddExamRequest, UpdateExamRequest } from "@/features/exams/types";

export function useCreateExams() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddExamRequest[]) => createExams(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useUpdateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateExamRequest) => updateExam(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useDeleteExams() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteExams(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}
