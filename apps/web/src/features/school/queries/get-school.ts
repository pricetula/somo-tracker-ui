import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { School } from "../types";

export async function getSchools(): Promise<School[]> {
    const resp = await authenticatedGet({ uri: "/schools" })
    if (!resp.ok) {
        const text = await resp.text();

        const err = new Error(text || resp.statusText);

        err.name = resp.statusText;

        throw err;
    }
    return await resp.json();
}