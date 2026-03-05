import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { Cohort } from "@/features/cohorts/types";

export async function fetchCohorts(): Promise<ActionResult<Cohort[]>> {
  try {
    const res = await browserApiClient("/cohorts");
    if (!res.ok) return { success: false, error: "Failed to fetch cohorts.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function fetchCohort(id: string): Promise<ActionResult<Cohort>> {
  try {
    const res = await browserApiClient(`/cohorts/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch cohort.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
