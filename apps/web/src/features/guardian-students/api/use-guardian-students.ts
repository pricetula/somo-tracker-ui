import { useSuspenseQuery } from "@tanstack/react-query";
import { getGuardianStudentsByGuardian } from "@/features/guardian-students/api/actions";

export function guardianStudentsMeta(guardianId: string) {
  return {
    queryKey: ["guardian-students", "guardian", guardianId] as const,
    queryFn: () => getGuardianStudentsByGuardian(guardianId),
  };
}

export function useGuardianStudentsByGuardian(guardianId: string) {
  return useSuspenseQuery(guardianStudentsMeta(guardianId));
}
