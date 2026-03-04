"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Institute, AddInstituteRequest, UpdateInstituteRequest } from "@/features/institutes/types";

export async function createInstitute(body: AddInstituteRequest): Promise<ActionResult<Institute>> {
  try {
    const res = await apiClient("/institutes", { method: "POST", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to create institute.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateInstitute(body: UpdateInstituteRequest): Promise<ActionResult<Institute>> {
  try {
    const res = await apiClient("/institutes", { method: "PUT", body: JSON.stringify(body) });
    if (!res.ok) return { success: false, error: "Failed to update institute.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
