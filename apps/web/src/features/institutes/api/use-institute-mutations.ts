import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInstitute, updateInstitute } from "@/features/institutes/api/actions";
import type { AddInstituteRequest, UpdateInstituteRequest } from "@/features/institutes/types";

export function useCreateInstitute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddInstituteRequest) => createInstitute(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutes"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useUpdateInstitute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateInstituteRequest) => updateInstitute(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["institutes"] }),
  });
}
