import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { Question } from "@/features/questions/types";

export async function fetchQuestionsByTopic(topicId: string): Promise<ActionResult<Question[]>> {
    try {
        const res = await browserApiClient(`/questions/topic/${topicId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch questions.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function fetchQuestion(id: string): Promise<ActionResult<Question>> {
    try {
        const res = await browserApiClient(`/questions/${id}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch question.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
