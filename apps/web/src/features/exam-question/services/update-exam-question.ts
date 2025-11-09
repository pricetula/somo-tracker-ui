import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { ExamQuestion } from "../types";

export async function updateExamQuestion(i: ExamQuestion): Promise<ExamQuestion> {
    const resp = await authenticatedPut({ uri: "/exam-questions", body: i })
    return await resp.json()
}
