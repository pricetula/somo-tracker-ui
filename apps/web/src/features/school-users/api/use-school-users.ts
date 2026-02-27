import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchSchoolUsers, type SchoolUsersParams } from "./fetch-school-users";

export function schoolUsersQueryKey(params: SchoolUsersParams = {}) {
  return ["school-users", params] as const;
}

export function useSchoolUsers(params: SchoolUsersParams = {}) {
  return useSuspenseQuery({
    queryKey: schoolUsersQueryKey(params),
    queryFn: () => fetchSchoolUsers(params),
  });
}
