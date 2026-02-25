import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getExams, getExam } from "@/features/exams/api/actions";

export const examsMeta = {
  queryKey: ["exams"] as const,
  queryFn: getExams,
};

export function useExams() {
  return useSuspenseQuery({
    queryKey: examsMeta.queryKey,
    queryFn: examsMeta.queryFn,
  });
}

export function examMeta(id: string) {
  return {
    queryKey: ["exams", id] as const,
    queryFn: () => getExam(id),
  };
}

export function useExam(id: string) {
  return useQuery(examMeta(id));
}
