"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type {
  EducationSystem,
  AddEducationSystemRequest,
  UpdateEducationSystemRequest,
} from "@/features/education/types";

export async function getEducationSystems(): Promise<ActionResult<EducationSystem[]>> {
  try {
    const res = await apiClient("/education-systems");
    if (!res.ok) return { success: false, error: "Failed to fetch education systems.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function getEducationSystem(id: string): Promise<ActionResult<EducationSystem>> {
  try {
    const res = await apiClient(`/education-systems/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch education system.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function createEducationSystems(
  body: AddEducationSystemRequest[]
): Promise<ActionResult<EducationSystem[]>> {
  try {
    const res = await apiClient("/education-systems", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) return { success: false, error: "Failed to create education systems.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateEducationSystem(
  body: UpdateEducationSystemRequest
): Promise<ActionResult<EducationSystem>> {
  try {
    const res = await apiClient("/education-systems", {
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (!res.ok) return { success: false, error: "Failed to update education system.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function deleteEducationSystems(ids: string[]): Promise<ActionResult<void>> {
  try {
    const res = await apiClient("/education-systems", {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) return { success: false, error: "Failed to delete education systems.", code: res.status };
    return { success: true };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
