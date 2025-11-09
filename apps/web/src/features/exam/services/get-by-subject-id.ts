import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Exam } from "../types";

export async function getExamsBySubjectID(subjectID: string): Promise<Exam[] | null> {
    if (!subjectID) throw new Error("Subject ID is required");
    const resp = await authenticatedGet({ uri: `/exams/subject/${subjectID}` })
    return await resp.json();
}
