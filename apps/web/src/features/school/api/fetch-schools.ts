import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { School } from "@/features/school/types";

export async function fetchSchoolsByInstitute(): Promise<ActionResult<School[]>> {
    try {
        const res = await browserApiClient("/schools/institute");
        if (!res.ok) return { success: false, error: "Failed to fetch schools.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function fetchSchool(id: string): Promise<ActionResult<School>> {
    try {
        const res = await browserApiClient(`/schools/${id}`);
        if (!res.ok) return { success: false, error: "Failed to fetch school.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
