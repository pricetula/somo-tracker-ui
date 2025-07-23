import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Invitation } from "../types";

export async function getInvitations(): Promise<Invitation[]> {
    const resp = await authenticatedGet({ uri: "/invitations" })
    if (!resp.ok) {
        const text = await resp.text();
        const err = new Error(text || resp.statusText);
        err.name = resp.statusText;
        throw err;
    }
    return await resp.json();
}