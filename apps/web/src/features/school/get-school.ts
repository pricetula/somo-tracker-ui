import { getApi } from "@/shared/lib/api";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { School } from "./types";

export async function getSchools(): Promise<School[]> {
    const token = await getAccessTokenFromAuthCookie();
    const resp = await getApi({ uri: "/schools", token })
    return await resp.json();
}