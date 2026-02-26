import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getSchoolsByInstitute, getSchool } from "@/features/school/api/actions";

export const schoolsMeta = {
  queryKey: ["schools"] as const,
  queryFn: getSchoolsByInstitute,
};

export function useSchools() {
  return useSuspenseQuery({
    queryKey: schoolsMeta.queryKey,
    queryFn: schoolsMeta.queryFn,
  });
}

export function schoolMeta(id: string) {
  return {
    queryKey: ["schools", id] as const,
    queryFn: () => getSchool(id),
  };
}

export function useSchool(id: string) {
  return useQuery(schoolMeta(id));
}
