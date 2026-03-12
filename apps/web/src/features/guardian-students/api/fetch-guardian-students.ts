import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { GuardianStudent } from "@/features/guardian-students/types";

export async function fetchGuardianStudentsByGuardian(
    guardianId: string
): Promise<ActionResult<GuardianStudent[]>> {
    try {
        const res = await browserApiClient(`/guardian-students/guardian/${guardianId}`);
        if (!res.ok)
            return {
                success: false,
                error: "Failed to fetch guardian students.",
                code: res.status,
            };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
