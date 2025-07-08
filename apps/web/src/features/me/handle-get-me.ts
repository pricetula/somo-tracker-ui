"use server"

import { redirect } from "next/navigation";
import { getMe } from "./get-me";
import { InstituteUser } from "./types";

export async function handleGetMe(): Promise<InstituteUser> {
    try {
        const me = await getMe();
        if (!me?.user?.id && !me?.institute?.id) {
            redirect("/onboarding");
        }
        return me;
    } catch (error) {
        redirect("/signout");
    }
}