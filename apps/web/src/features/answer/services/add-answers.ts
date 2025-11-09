import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { AnswerInput, Answer } from "../types";

export async function addAnswers(i: AnswerInput[]): Promise<Answer[]> {
    if (i.length === 0) throw new Error("answer details required to be added")
    const resp = await authenticatedPost({ uri: "/answers", body: i })
    return await resp.json()
}
