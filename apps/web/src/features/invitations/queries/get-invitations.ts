import { getApi } from "@/shared/lib/api";
import { Invitation } from "../types";

export async function getInvitations(token: string): Promise<Invitation[]> {
    const resp = await getApi({ uri: "/schools", token })
    if (!resp.ok) {
        const text = await resp.text();
        const err = new Error(text || resp.statusText);
        err.name = resp.statusText;
        throw err;
    }
    return await resp.json();
}