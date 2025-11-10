import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Question } from "../types";

export async function getQuestionsByTopicID(id: string): Promise<Question[] | null> {
    const resp = await authenticatedGet({ uri: `/questions/topic/${id}` })
    return await resp.json();
}
