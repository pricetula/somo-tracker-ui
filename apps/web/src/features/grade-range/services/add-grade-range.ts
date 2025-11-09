import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { GradeRange, GradeRangeInput } from "../types";

export async function addGradeRanges(body: GradeRangeInput[]): Promise<GradeRange[]> {
    if (body.length === 0) throw new Error("grade-range details required to be added")
    const resp = await authenticatedPost({ uri: "/grade-range", body })
    return await resp.json()
}
