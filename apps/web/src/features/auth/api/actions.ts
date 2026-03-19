"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import { sendMagicLinkSchema, verifyMagicLinkSchema } from "@/features/auth/types";
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

export async function verifyMagicLinkAction(token: string): Promise<ActionResult> {
    const parsed = verifyMagicLinkSchema.safeParse({ token });
    if (!parsed.success) {
        return { success: false, error: "Invalid or missing token." };
    }

    try {
        const response = await apiClient("/auth/verify-magic-link-token", {
            method: "POST",
            body: JSON.stringify({ token: parsed.data.token }),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            return {
                success: false,
                error: (body as { message?: string }).message ?? "Failed to verify magic link.",
                code: response.status,
            };
        }

        const setCookie = response.headers.get("set-cookie");
        const match = setCookie?.match(/session_token=([^;]+)/);
        if (match?.[1]) {
            const cookieStore = await cookies();
            cookieStore.set("session_token", match[1], {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 86400,
                path: "/",
            });
        }

        return { success: true };
    } catch {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
