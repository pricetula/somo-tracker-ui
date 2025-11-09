import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { ExamQuestion } from "../types";

export async function addExamQuestions(i: ExamQuestion[]): Promise<ExamQuestion[]> {
    if (i.length === 0) throw new Error("exam-question details required to be added")
    const resp = await authenticatedPost({ uri: "/exam-questions", body: i })
    return await resp.json()
}
