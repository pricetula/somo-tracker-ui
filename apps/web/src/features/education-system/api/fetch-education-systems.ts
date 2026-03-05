import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { EducationSystem } from "../types";

export async function fetchEducationSystems(): Promise<ActionResult<EducationSystem[]>> {
  try {
    const res = await browserApiClient("/education-systems");
    if (!res.ok) return { success: false, error: "Failed to fetch education systems.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function fetchEducationSystem(id: string): Promise<ActionResult<EducationSystem>> {
  try {
    const res = await browserApiClient(`/education-systems/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch education system.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
