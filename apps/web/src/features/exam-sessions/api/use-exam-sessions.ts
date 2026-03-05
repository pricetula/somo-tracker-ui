import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchExamSessionsByExam, fetchExamSession } from "./fetch-exam-sessions";

export function examSessionsByExamQueryKey(examId: string) {
  return ["exam-sessions", "exam", examId] as const;
}

export function useExamSessionsByExam(examId: string) {
  return useSuspenseQuery({
    queryKey: examSessionsByExamQueryKey(examId),
    queryFn: () => fetchExamSessionsByExam(examId),
  });
}

export function examSessionQueryKey(id: string) {
  return ["exam-sessions", id] as const;
}

export function useExamSession(id: string) {
  return useQuery({
    queryKey: examSessionQueryKey(id),
    queryFn: () => fetchExamSession(id),
  });
}
