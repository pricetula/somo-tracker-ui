import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { Exam } from "@/features/exams/types";

export async function fetchExams(): Promise<ActionResult<Exam[]>> {
  try {
    const res = await browserApiClient("/exams");
    if (!res.ok) return { success: false, error: "Failed to fetch exams.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function fetchExam(id: string): Promise<ActionResult<Exam>> {
  try {
    const res = await browserApiClient(`/exams/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch exam.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
