import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { GradeRange } from "../types";

export async function getAll(): Promise<GradeRange[] | null> {
    const resp = await authenticatedGet({ uri: "/grade-range" })
    return await resp.json();
}
