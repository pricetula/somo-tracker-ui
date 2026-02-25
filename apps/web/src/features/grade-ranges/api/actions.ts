"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { GradeRange, AddGradeRangeRequest, UpdateGradeRangeRequest } from "@/features/grade-ranges/types";

export async function getGradeRanges(): Promise<ActionResult<GradeRange[]>> {
  try {
    const res = await apiClient("/grade-ranges");
    if (!res.ok) return { success: false, error: "Failed to fetch grade ranges.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function createGradeRanges(body: AddGradeRangeRequest[]): Promise<ActionResult<GradeRange[]>> {
  try {
    const res = await apiClient("/grade-ranges", { method: "POST", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to create grade ranges.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateGradeRange(body: UpdateGradeRangeRequest): Promise<ActionResult<GradeRange>> {
  try {
    const res = await apiClient("/grade-ranges", { method: "PUT", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to update grade range.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function deleteGradeRanges(ids: string[]): Promise<ActionResult<void>> {
  try {
    const res = await apiClient("/grade-ranges", { method: "DELETE", body: JSON.stringify({ ids }) });
    if (!res.ok) return { success: false, error: "Failed to delete grade ranges.", code: res.status };
    return { success: true };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
