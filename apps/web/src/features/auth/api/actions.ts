"use server";

import { apiClient } from "@/lib/api-client";
import { sendMagicLinkSchema } from "@/features/auth/types";
import type { ActionResult } from "@/types/action-result";

export async function sendMagicLinkAction(
    _prevState: ActionResult,
    formData: FormData
): Promise<ActionResult> {
    const raw = {
        email: formData.get("email"),
        full_name: formData.get("full_name") || undefined,
    };

    const parsed = sendMagicLinkSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            success: false,
            error: "Invalid email address.",
            validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    try {
        const response = await apiClient("/auth/magic-link", {
            method: "POST",
            body: JSON.stringify({
                email: parsed.data.email,
                ...(parsed.data.full_name ? { full_name: parsed.data.full_name } : {}),
            }),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            return {
                success: false,
                error: (body as { message?: string }).message ?? "Failed to send magic link.",
                code: response.status,
            };
        }

        return { success: true };
    } catch {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
