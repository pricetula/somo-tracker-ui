import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { EducationSystem } from "../types";

export async function getEducationSystems(): Promise<EducationSystem[]> {
    const resp = await authenticatedGet({ uri: "/education-systems" })
    if (!resp.ok) {
        const text = await resp.text();
        const err = new Error(text || resp.statusText);
        err.name = resp.statusText;
        throw err;
    }
    return await resp.json();
}