import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { QuestionInput, Question } from "../types";

export async function addQuestions(i: QuestionInput[]): Promise<Question[]> {
    if (i.length === 0) throw new Error("exam-question details required to be added")
    const resp = await authenticatedPost({ uri: "/questions", body: i })
    return await resp.json()
}
