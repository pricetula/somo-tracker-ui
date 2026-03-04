import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchExams, fetchExam } from "./fetch-exams";

export const examsQueryKey = ["exams"] as const;

export function useExams() {
  return useSuspenseQuery({
    queryKey: examsQueryKey,
    queryFn: fetchExams,
  });
}

export function examQueryKey(id: string) {
  return ["exams", id] as const;
}

export function useExam(id: string) {
  return useQuery({
    queryKey: examQueryKey(id),
    queryFn: () => fetchExam(id),
  });
}
