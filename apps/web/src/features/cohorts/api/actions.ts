"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Cohort, AddCohortRequest, UpdateCohortRequest } from "@/features/cohorts/types";

export async function getCohorts(): Promise<ActionResult<Cohort[]>> {
  try {
    const res = await apiClient("/cohorts");
    if (!res.ok) return { success: false, error: "Failed to fetch cohorts.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function getCohort(id: string): Promise<ActionResult<Cohort>> {
  try {
    const res = await apiClient(`/cohorts/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch cohort.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function createCohorts(body: AddCohortRequest[]): Promise<ActionResult<Cohort[]>> {
  try {
    const res = await apiClient("/cohorts", { method: "POST", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to create cohorts.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateCohort(body: UpdateCohortRequest): Promise<ActionResult<Cohort>> {
  try {
    const res = await apiClient("/cohorts", { method: "PUT", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to update cohort.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function deleteCohorts(ids: string[]): Promise<ActionResult<void>> {
  try {
    const res = await apiClient("/cohorts", { method: "DELETE", body: JSON.stringify({ ids }) });
    if (!res.ok) return { success: false, error: "Failed to delete cohorts.", code: res.status };
    return { success: true };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
