import { getApi } from "@/shared/lib/api";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { InstituteUser } from "./types";

export async function getMe(): Promise<InstituteUser> {
    const token = await getAccessTokenFromAuthCookie();
    const resp = await getApi({ uri: "/me", token })
    return await resp.json();
}