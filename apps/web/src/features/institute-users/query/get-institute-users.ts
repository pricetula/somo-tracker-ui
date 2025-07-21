import { getApi } from "@/shared/lib/api";
import { InstituteUsers } from "../types";

export async function getInstituteUsers(token: string): Promise<InstituteUsers[]> {
    const resp = await getApi({ uri: "/institute-users", token })
    if (!resp.ok) {
        const text = await resp.text();
        const err = new Error(text || resp.statusText);
        err.name = resp.statusText;
        throw err;
    }
    return await resp.json();
}