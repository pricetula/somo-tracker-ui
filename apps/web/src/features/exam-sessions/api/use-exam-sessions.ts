import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getExamSessionsByExam, getExamSession } from "@/features/exam-sessions/api/actions";

export function examSessionsByExamMeta(examId: string) {
  return {
    queryKey: ["exam-sessions", "exam", examId] as const,
    queryFn: () => getExamSessionsByExam(examId),
  };
}

export function useExamSessionsByExam(examId: string) {
  return useSuspenseQuery(examSessionsByExamMeta(examId));
}

export function examSessionMeta(id: string) {
  return {
    queryKey: ["exam-sessions", id] as const,
    queryFn: () => getExamSession(id),
  };
}

export function useExamSession(id: string) {
  return useQuery(examSessionMeta(id));
}
