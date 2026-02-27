import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { ExamSession } from "@/features/exam-sessions/types";

export async function fetchExamSessionsByExam(examId: string): Promise<ActionResult<ExamSession[]>> {
  try {
    const res = await browserApiClient(`/exam-sessions/exam/${examId}`);
    if (!res.ok) return { success: false, error: "Failed to fetch exam sessions.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function fetchExamSession(id: string): Promise<ActionResult<ExamSession>> {
  try {
    const res = await browserApiClient(`/exam-sessions/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch exam session.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
