import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { Answer } from "../types";

export async function updateCohort(i: Answer): Promise<Answer> {
    const resp = await authenticatedPut({ uri: "/answers", body: i })
    return await resp.json()
}
