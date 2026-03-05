import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { Topic } from "@/features/topics/types";

export async function fetchTopicsBySubject(subjectId: string): Promise<ActionResult<Topic[]>> {
  try {
    const res = await browserApiClient(`/topics/subject/${subjectId}`);
    if (!res.ok) return { success: false, error: "Failed to fetch topics.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function fetchTopic(id: string): Promise<ActionResult<Topic>> {
  try {
    const res = await browserApiClient(`/topics/${id}`);
    if (!res.ok) return { success: false, error: "Failed to fetch topic.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
