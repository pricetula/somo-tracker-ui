import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Exam } from "../types";

export async function getExamsByYearGroupID(yearGroupID: string): Promise<Exam[] | null> {
    if (!yearGroupID) throw new Error("Year group ID is required");
    const resp = await authenticatedGet({ uri: `/exams/year-group/${yearGroupID}` })
    return await resp.json();
}
