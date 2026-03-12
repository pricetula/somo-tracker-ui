import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type { SchoolUserSearchResponse } from "@/features/school-users/types";

export interface SchoolUsersParams {
    search?: string;
    role?: string;
    limit?: number;
    offset?: number;
}

export async function fetchSchoolUsers(
    params: SchoolUsersParams = {}
): Promise<ActionResult<SchoolUserSearchResponse>> {
    try {
        const query = new URLSearchParams();
        if (params.search) query.set("search", params.search);
        if (params.role) query.set("role", params.role);
        if (params.limit !== undefined) query.set("limit", String(params.limit));
        if (params.offset !== undefined) query.set("offset", String(params.offset));

        const path = query.size ? `/school-users?${query}` : "/school-users";
        const res = await browserApiClient(path);
        if (!res.ok)
            return { success: false, error: "Failed to fetch school users.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
