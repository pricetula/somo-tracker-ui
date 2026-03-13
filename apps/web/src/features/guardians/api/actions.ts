"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { AddUser } from "@/lib/importer-engine";

export async function bulkAddGuardians(guardians: AddUser[]): Promise<ActionResult<void>> {
    try {
        const res = await apiClient("/guardians", {
            method: "POST",
            body: JSON.stringify(guardians),
        });
        if (!res.ok) {
            const t = await res.text();
            let textError = "";
            if (t.length && t.includes("error")) {
                textError = JSON.parse(t).error;
            }
            return { success: false, error: textError, code: res.status };
        }
        return { success: true, data: undefined };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
