import { getApi } from "@/shared/lib/api";
import { School } from "../types";

export async function getSchools(token: string): Promise<School[]> {
    const resp = await getApi({ uri: "/schools", token })
    if (!resp.ok) {
        const { error } = await resp.json();
        const err = new Error(error || resp.statusText);
        err.name = resp.statusText;
        throw err;
    }
    return await resp.json();
}