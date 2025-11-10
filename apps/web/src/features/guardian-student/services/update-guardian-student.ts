import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { GradeRange } from "../types";

export async function updateGradeRange(i: GradeRange): Promise<GradeRange> {
    const resp = await authenticatedPut({ uri: "/grade-range", body: i })
    return await resp.json()
}
