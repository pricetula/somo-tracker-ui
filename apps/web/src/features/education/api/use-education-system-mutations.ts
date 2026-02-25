import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEducationSystems,
  updateEducationSystem,
  deleteEducationSystems,
} from "@/features/education/api/actions";
import type {
  AddEducationSystemRequest,
  UpdateEducationSystemRequest,
} from "@/features/education/types";

export function useCreateEducationSystems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddEducationSystemRequest[]) => createEducationSystems(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["education-systems"] }),
  });
}

export function useUpdateEducationSystem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateEducationSystemRequest) => updateEducationSystem(body),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["education-systems"] });
      if (vars.id) queryClient.invalidateQueries({ queryKey: ["education-systems", vars.id] });
    },
  });
}

export function useDeleteEducationSystems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => deleteEducationSystems(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["education-systems"] }),
  });
}
