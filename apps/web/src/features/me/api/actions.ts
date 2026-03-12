"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Me } from "@/features/me/types";

export async function getMe(): Promise<ActionResult<Me>> {
    try {
        const res = await apiClient("/me");

        if (res.status === 401) {
            (await cookies()).delete("session_token");
            return { success: false, error: "Session expired.", code: 401 };
        }

        if (!res.ok) {
            return { success: false, error: "Failed to fetch user.", code: res.status };
        }

        const data: Me = await res.json();
        return { success: true, data };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
