import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ExamQuestion } from "../types";

export async function getExamQuestionsByExamID(examID: string): Promise<ExamQuestion[] | null> {
    const resp = await authenticatedGet({ uri: `/exam-questions/${examID}` })
    return await resp.json();
}
