import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { verifyMagicLink } from "@/features/auth/api/verify-magic-link";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token")?.trim();

    if (!token) {
        redirect("/login");
    }

    const result = await verifyMagicLink(token);

    if (!result.success) {
        redirect(`/login?error=${encodeURIComponent(result.error)}`);
    }

    redirect("/");
}
