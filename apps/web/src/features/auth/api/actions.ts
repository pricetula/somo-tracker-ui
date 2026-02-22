"use server";

import { magicLinkSchema, type MagicLinkInput } from "@/features/auth/types/auth-schema";
import type { ActionResult } from "@/types/action-result";

export async function requestMagicLink(input: MagicLinkInput): Promise<ActionResult> {
  const parsed = magicLinkSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return { success: false, error: "Server misconfiguration.", code: 500 };
  }

  try {
    const res = await fetch(`${backendUrl}/magic-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.data.email }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        error: body?.message ?? "Something went wrong. Please try again.",
        code: res.status,
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Unable to reach the server. Please try again.", code: 503 };
  }
}
