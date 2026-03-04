import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { ActivityLog } from "@/features/activity-logs/types";

export async function fetchActivityLogs(): Promise<ActionResult<ActivityLog[]>> {
  try {
    const res = await browserApiClient("/activity-logs");
    if (!res.ok) return { success: false, error: "Failed to fetch activity logs.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
