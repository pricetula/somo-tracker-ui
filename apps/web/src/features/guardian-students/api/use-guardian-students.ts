import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchGuardianStudentsByGuardian } from "./fetch-guardian-students";

export function guardianStudentsQueryKey(guardianId: string) {
  return ["guardian-students", "guardian", guardianId] as const;
}

export function useGuardianStudentsByGuardian(guardianId: string) {
  return useSuspenseQuery({
    queryKey: guardianStudentsQueryKey(guardianId),
    queryFn: () => fetchGuardianStudentsByGuardian(guardianId),
  });
}
