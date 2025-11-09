import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Answer } from "../types";

export async function getAnswers(): Promise<Answer[] | null> {
    const resp = await authenticatedGet({ uri: "/answers" })
    return await resp.json();
}
