"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { AddUser } from "@/lib/importer-engine";

export async function bulkAddFaculty(faculty: AddUser[]): Promise<ActionResult<void>> {
    try {
        const res = await apiClient("/faculty", {
            method: "POST",
            body: JSON.stringify(faculty),
        });
        if (!res.ok)
            return { success: false, error: "Failed to import faculty.", code: res.status };
        return { success: true, data: undefined };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
