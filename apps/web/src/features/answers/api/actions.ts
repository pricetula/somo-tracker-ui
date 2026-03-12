"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Answer, AddAnswerRequest, UpdateAnswerRequest } from "@/features/answers/types";

export async function getAnswersByQuestion(questionId: string): Promise<ActionResult<Answer[]>> {
    try {
        const res = await apiClient(`/answers/question/${questionId}`);
        if (!res.ok) return { success: false, error: "Failed to fetch answers.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function createAnswers(body: AddAnswerRequest[]): Promise<ActionResult<Answer[]>> {
    try {
        const res = await apiClient("/answers", { method: "POST", body: JSON.stringify(body) });
        if (!res.ok)
            return { success: false, error: "Failed to create answers.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function updateAnswer(body: UpdateAnswerRequest): Promise<ActionResult<Answer>> {
    try {
        const res = await apiClient("/answers", { method: "PUT", body: JSON.stringify(body) });
        if (!res.ok) return { success: false, error: "Failed to update answer.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function deleteAnswers(ids: string[]): Promise<ActionResult<void>> {
    try {
        const res = await apiClient("/answers", {
            method: "DELETE",
            body: JSON.stringify({ ids }),
        });
        if (!res.ok)
            return { success: false, error: "Failed to delete answers.", code: res.status };
        return { success: true };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
