import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { Question } from "../types";

export async function updateQuestion(i: Question): Promise<Question> {
    const resp = await authenticatedPut({ uri: "/questions", body: i })
    return await resp.json()
}
