import { cookies } from "next/headers";

export type VerifyInvitationResult =
  | { success: true }
  | { success: false; error: string; code: number };

export async function verifyInvitationToken(token: string): Promise<VerifyInvitationResult> {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return { success: false, error: "Server misconfiguration.", code: 500 };
  }

  try {
    const res = await fetch(`${backendUrl}/auth/verify-invitation-magic-link-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        error: body?.message ?? "Invalid or expired invitation link.",
        code: res.status,
      };
    }

    const { session_token } = await res.json();
    const cookieStore = await cookies();

    cookieStore.set("session_token", session_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unable to reach the server.";
    return { success: false, error: message, code: 503 };
  }
}
