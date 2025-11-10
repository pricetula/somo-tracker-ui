import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Question } from "../types";

export async function getQuestionByID(id: string): Promise<Question | null> {
    const resp = await authenticatedGet({ uri: `/questions/${id}` })
    return await resp.json();
}
