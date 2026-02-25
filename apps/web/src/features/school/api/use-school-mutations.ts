import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchools, updateSchool } from "@/features/school/api/actions";
import type { AddSchoolRequest, UpdateSchoolRequest } from "@/features/school/types";

export function useCreateSchools() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddSchoolRequest[]) => createSchools(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schools"] }),
  });
}

export function useUpdateSchool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateSchoolRequest) => updateSchool(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schools"] }),
  });
}
