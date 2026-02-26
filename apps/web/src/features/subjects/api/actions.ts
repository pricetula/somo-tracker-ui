"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Subject, AddSubjectRequest, UpdateSubjectRequest } from "@/features/subjects/types";

export async function getSubjectsByYearGroup(yearGroupId: string): Promise<ActionResult<Subject[]>> {
  try {
    const res = await apiClient(`/subjects/year-group/${yearGroupId}`);
    if (!res.ok) return { success: false, error: "Failed to fetch subjects.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function getSubject(id: string): Promise<ActionResult<Subject>> {
  try {
    const res = await apiClient(`/subjects/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch subject.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function createSubjects(body: AddSubjectRequest[]): Promise<ActionResult<Subject[]>> {
  try {
    const res = await apiClient("/subjects", { method: "POST", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to create subjects.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateSubject(body: UpdateSubjectRequest): Promise<ActionResult<Subject>> {
  try {
    const res = await apiClient("/subjects", { method: "PUT", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to update subject.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function deleteSubjects(ids: string[]): Promise<ActionResult<void>> {
  try {
    const res = await apiClient("/subjects", { method: "DELETE", body: JSON.stringify({ ids }) });
    if (!res.ok) return { success: false, error: "Failed to delete subjects.", code: res.status };
    return { success: true };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
