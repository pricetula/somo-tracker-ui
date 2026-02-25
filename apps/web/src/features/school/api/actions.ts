"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { School, AddSchoolRequest, UpdateSchoolRequest } from "@/features/school/types";

export async function getSchoolsByInstitute(): Promise<ActionResult<School[]>> {
  try {
    const res = await apiClient("/schools/institute");
    if (!res.ok) return { success: false, error: "Failed to fetch schools.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function getSchool(id: string): Promise<ActionResult<School>> {
  try {
    const res = await apiClient(`/schools/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch school.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function createSchools(body: AddSchoolRequest[]): Promise<ActionResult<School[]>> {
  try {
    const res = await apiClient("/schools", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) return { success: false, error: "Failed to create schools.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateSchool(body: UpdateSchoolRequest): Promise<ActionResult<School>> {
  try {
    const res = await apiClient("/schools", {
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (!res.ok) return { success: false, error: "Failed to update school.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
