"use server"

import { redirect } from "next/navigation";
import { handleLogout } from "@/features/auth/handle-logout";
import { getMe } from "./get-me";

export async function handleGetMe() {
    const me = await getMe();
    if (!me?.user?.id && !me?.institute?.id) {
        return redirect("/onboarding");
    }
    handleLogout()
}