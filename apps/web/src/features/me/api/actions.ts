"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Membership } from "@/features/me/types";

export async function getMeAction(): Promise<ActionResult<Membership>> {
    try {
        const response = await apiClient("/me");

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            return {
                success: false,
                error: (body as { message?: string }).message ?? "Failed to fetch user data.",
                code: response.status,
            };
        }

        const data: Membership = await response.json();
        return { success: true, data };
    } catch {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
