"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import { onboardSchema } from "@/features/onboarding/types";
import type { OnboardResponse } from "@/features/onboarding/types";

export async function onboardAction(
    _prevState: ActionResult<OnboardResponse>,
    formData: FormData
): Promise<ActionResult<OnboardResponse>> {
    const parsed = onboardSchema.safeParse({
        tenant_name: formData.get("tenant_name"),
        school_name: formData.get("school_name"),
    });

    if (!parsed.success) {
        return {
            success: false,
            error: "Invalid input.",
            validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    try {
        const response = await apiClient("/onboarding", {
            method: "POST",
            body: JSON.stringify(parsed.data),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            return {
                success: false,
                error: (body as { message?: string }).message ?? "Failed to complete onboarding.",
                code: response.status,
            };
        }

        const data: OnboardResponse = await response.json();
        return { success: true, data };
    } catch {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
