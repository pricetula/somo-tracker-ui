import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getEducationSystems, getEducationSystem } from "@/features/education/api/actions";

export const educationSystemsMeta = {
  queryKey: ["education-systems"] as const,
  queryFn: getEducationSystems,
};

export function useEducationSystems() {
  return useSuspenseQuery({
    queryKey: educationSystemsMeta.queryKey,
    queryFn: educationSystemsMeta.queryFn,
  });
}

export function educationSystemMeta(id: string) {
  return {
    queryKey: ["education-systems", id] as const,
    queryFn: () => getEducationSystem(id),
  };
}

export function useEducationSystem(id: string) {
  return useQuery(educationSystemMeta(id));
}
