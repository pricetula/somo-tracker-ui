"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Question, AddQuestionRequest, UpdateQuestionRequest } from "@/features/questions/types";

export async function getQuestionsByTopic(topicId: string): Promise<ActionResult<Question[]>> {
  try {
    const res = await apiClient(`/questions/topic/${topicId}`);
    if (!res.ok) return { success: false, error: "Failed to fetch questions.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function getQuestion(id: string): Promise<ActionResult<Question>> {
  try {
    const res = await apiClient(`/questions/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch question.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function createQuestions(body: AddQuestionRequest[]): Promise<ActionResult<Question[]>> {
  try {
    const res = await apiClient("/questions", { method: "POST", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to create questions.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateQuestion(body: UpdateQuestionRequest): Promise<ActionResult<Question>> {
  try {
    const res = await apiClient("/questions", { method: "PUT", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to update question.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function deleteQuestions(ids: string[]): Promise<ActionResult<void>> {
  try {
    const res = await apiClient("/questions", { method: "DELETE", body: JSON.stringify({ ids }) });
    if (!res.ok) return { success: false, error: "Failed to delete questions.", code: res.status };
    return { success: true };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
