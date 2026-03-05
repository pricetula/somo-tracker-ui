import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchSchoolsByInstitute, fetchSchool } from "./fetch-schools";

export const schoolsQueryKey = ["schools"] as const;

export function useSchools() {
  return useQuery({
    queryKey: schoolsQueryKey,
    queryFn: fetchSchoolsByInstitute,
  });
}

export function schoolQueryKey(id: string) {
  return ["schools", id] as const;
}

export function useSchool(id: string) {
  return useQuery({
    queryKey: schoolQueryKey(id),
    queryFn: () => fetchSchool(id),
  });
}
