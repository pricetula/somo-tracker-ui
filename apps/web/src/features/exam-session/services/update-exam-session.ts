import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { ExamSession } from "../types";

export async function updateExamSession(i: ExamSession): Promise<ExamSession> {
    const resp = await authenticatedPut({ uri: "/exam-session", body: i })
    return await resp.json()
}
