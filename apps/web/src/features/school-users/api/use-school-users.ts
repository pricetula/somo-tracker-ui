import { useSuspenseQuery } from "@tanstack/react-query";
import { getSchoolUsers, type SchoolUsersParams } from "@/features/school-users/api/actions";

export function schoolUsersMeta(params: SchoolUsersParams = {}) {
  return {
    queryKey: ["school-users", params] as const,
    queryFn: () => getSchoolUsers(params),
  };
}

export function useSchoolUsers(params: SchoolUsersParams = {}) {
  return useSuspenseQuery(schoolUsersMeta(params));
}
