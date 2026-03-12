import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { Answer } from "@/features/answers/types";

export async function fetchAnswersByQuestion(questionId: string): Promise<ActionResult<Answer[]>> {
    try {
        const res = await browserApiClient(`/answers/question/${questionId}`);
        if (!res.ok) return { success: false, error: "Failed to fetch answers.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
