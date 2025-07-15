import { getApi } from "@/shared/lib/api";
import { EducationSystem } from "../types";

export async function getEducationSystems(token: string): Promise<EducationSystem[]> {
    const resp = await getApi({ uri: "/education-systems", token })
    if (!resp.ok) {
        const { error } = await resp.json();
        const err = new Error(error || resp.statusText);
        err.name = resp.statusText;
        throw err;
    }
    return await resp.json();
}