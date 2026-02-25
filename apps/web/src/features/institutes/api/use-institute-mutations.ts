import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInstitute } from "@/features/institutes/api/actions";
import type { UpdateInstituteRequest } from "@/features/institutes/types";

export function useUpdateInstitute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateInstituteRequest) => updateInstitute(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["institutes"] }),
  });
}
