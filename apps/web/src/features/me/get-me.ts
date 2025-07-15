import { getApi } from "@/shared/lib/api";
import { InstituteUser } from "./types";

export async function getMe(token: string): Promise<InstituteUser> {
    const resp = await getApi({ uri: "/me", token })
    if (!resp.ok) {
        const { error } = await resp.json()
        const err = new Error(error || resp.statusText);
        err.name = resp.statusText;
        throw err;
    }
    return await resp.json();
}