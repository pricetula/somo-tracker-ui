"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Topic, AddTopicRequest, UpdateTopicRequest } from "@/features/topics/types";

export async function getTopicsBySubject(subjectId: string): Promise<ActionResult<Topic[]>> {
    try {
        const res = await apiClient(`/topics/subject/${subjectId}`);
        if (!res.ok) return { success: false, error: "Failed to fetch topics.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function getTopic(id: string): Promise<ActionResult<Topic>> {
    try {
        const res = await apiClient(`/topics/${id}`);
        if (!res.ok) return { success: false, error: "Failed to fetch topic.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function createTopics(body: AddTopicRequest[]): Promise<ActionResult<Topic[]>> {
    try {
        const res = await apiClient("/topics", { method: "POST", body: JSON.stringify(body) });
        if (!res.ok) return { success: false, error: "Failed to create topics.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function updateTopic(body: UpdateTopicRequest): Promise<ActionResult<Topic>> {
    try {
        const res = await apiClient("/topics", { method: "PUT", body: JSON.stringify(body) });
        if (!res.ok) return { success: false, error: "Failed to update topic.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function deleteTopics(ids: string[]): Promise<ActionResult<void>> {
    try {
        const res = await apiClient("/topics", { method: "DELETE", body: JSON.stringify({ ids }) });
        if (!res.ok) return { success: false, error: "Failed to delete topics.", code: res.status };
        return { success: true };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
