import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { Invitation } from "@/features/invitations/types";

export async function fetchInvitations(): Promise<ActionResult<Invitation[]>> {
    try {
        const res = await browserApiClient("/invitations");
        if (!res.ok)
            return { success: false, error: "Failed to fetch invitations.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
