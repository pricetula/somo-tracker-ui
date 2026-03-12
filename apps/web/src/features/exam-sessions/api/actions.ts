"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type {
    ExamSession,
    AddExamSessionRequest,
    UpdateExamSessionRequest,
} from "@/features/exam-sessions/types";

export async function getExamSessionsByExam(examId: string): Promise<ActionResult<ExamSession[]>> {
    try {
        const res = await apiClient(`/exam-sessions/exam/${examId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch exam sessions.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function getExamSession(id: string): Promise<ActionResult<ExamSession>> {
    try {
        const res = await apiClient(`/exam-sessions/${id}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch exam session.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function createExamSessions(
    body: AddExamSessionRequest[]
): Promise<ActionResult<ExamSession[]>> {
    try {
        const res = await apiClient("/exam-sessions", {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (!res.ok)
            return { success: false, error: "Failed to create exam sessions.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function updateExamSession(
    body: UpdateExamSessionRequest
): Promise<ActionResult<ExamSession>> {
    try {
        const res = await apiClient("/exam-sessions", {
            method: "PUT",
            body: JSON.stringify(body),
        });
        if (!res.ok)
            return { success: false, error: "Failed to update exam session.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function deleteExamSessions(ids: string[]): Promise<ActionResult<void>> {
    try {
        const res = await apiClient("/exam-sessions", {
            method: "DELETE",
            body: JSON.stringify({ ids }),
        });
        if (!res.ok)
            return { success: false, error: "Failed to delete exam sessions.", code: res.status };
        return { success: true };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
