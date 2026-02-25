import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuardianStudents, deleteGuardianStudent } from "@/features/guardian-students/api/actions";
import type { AddGuardianStudentRequest, DeleteGuardianStudentRequest } from "@/features/guardian-students/types";

export function useCreateGuardianStudents(guardianId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddGuardianStudentRequest[]) => createGuardianStudents(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guardian-students", "guardian", guardianId] }),
  });
}

export function useDeleteGuardianStudent(guardianId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: DeleteGuardianStudentRequest) => deleteGuardianStudent(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guardian-students", "guardian", guardianId] }),
  });
}
