import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { Answer } from "../types";

export async function updateAnswer(i: Answer): Promise<Answer> {
    const resp = await authenticatedPut({ uri: "/answers", body: i })
    return await resp.json()
}
