import { useSuspenseQuery } from "@tanstack/react-query";
import { getGradeRanges } from "@/features/grade-ranges/api/actions";

export const gradeRangesMeta = {
  queryKey: ["grade-ranges"] as const,
  queryFn: getGradeRanges,
};

export function useGradeRanges() {
  return useSuspenseQuery({
    queryKey: gradeRangesMeta.queryKey,
    queryFn: gradeRangesMeta.queryFn,
  });
}
