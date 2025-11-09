import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";
import { ExamQuestionID } from "../types";

export async function deleteByExamQuestions(body: ExamQuestionID[]): Promise<void> {
    if (body.length === 0) throw new Error("ids required to delete exam-questions")
    await authenticatedDelete({ uri: "/exam-questions", body })
}
