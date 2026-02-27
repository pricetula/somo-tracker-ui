import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { GradeRange } from "@/features/grade-ranges/types";

export async function fetchGradeRanges(): Promise<ActionResult<GradeRange[]>> {
  try {
    const res = await browserApiClient("/grade-ranges");
    if (!res.ok) return { success: false, error: "Failed to fetch grade ranges.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
