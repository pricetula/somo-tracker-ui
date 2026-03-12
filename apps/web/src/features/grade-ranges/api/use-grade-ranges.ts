import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchGradeRanges } from "./fetch-grade-ranges";

export const gradeRangesQueryKey = ["grade-ranges"] as const;

export function useGradeRanges() {
    return useSuspenseQuery({
        queryKey: gradeRangesQueryKey,
        queryFn: fetchGradeRanges,
    });
}
