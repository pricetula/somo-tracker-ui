import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { Subject } from "@/features/subjects/types";

export async function fetchSubjectsByYearGroup(yearGroupId: string): Promise<ActionResult<Subject[]>> {
  try {
    const res = await browserApiClient(`/subjects/year-group/${yearGroupId}`);
    if (!res.ok) return { success: false, error: "Failed to fetch subjects.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function fetchSubject(id: string): Promise<ActionResult<Subject>> {
  try {
    const res = await browserApiClient(`/subjects/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch subject.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
