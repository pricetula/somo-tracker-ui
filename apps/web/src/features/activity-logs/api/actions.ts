"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { ActivityLog } from "@/features/activity-logs/types";

export async function getActivityLogs(): Promise<ActionResult<ActivityLog[]>> {
    try {
        const res = await apiClient("/activity-logs");
        if (!res.ok)
            return { success: false, error: "Failed to fetch activity logs.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
