import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGradeRanges, updateGradeRange, deleteGradeRanges } from "@/features/grade-ranges/api/actions";
import type { AddGradeRangeRequest, UpdateGradeRangeRequest } from "@/features/grade-ranges/types";

export function useCreateGradeRanges() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddGradeRangeRequest[]) => createGradeRanges(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grade-ranges"] }),
  });
}

export function useUpdateGradeRange() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateGradeRangeRequest) => updateGradeRange(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grade-ranges"] }),
  });
}

export function useDeleteGradeRanges() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => deleteGradeRanges(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grade-ranges"] }),
  });
}
