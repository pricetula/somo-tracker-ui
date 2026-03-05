import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCohorts, updateCohort, deleteCohorts } from "@/features/cohorts/api/actions";
import type { AddCohortRequest, UpdateCohortRequest } from "@/features/cohorts/types";

export function useCreateCohorts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCohortRequest[]) => createCohorts(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cohorts"] }),
  });
}

export function useUpdateCohort() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateCohortRequest) => updateCohort(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cohorts"] }),
  });
}

export function useDeleteCohorts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => deleteCohorts(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cohorts"] }),
  });
}
