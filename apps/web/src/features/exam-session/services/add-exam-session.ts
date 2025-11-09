import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { ExamSession, ExamSessionInput } from "../types";

export async function addExamSessions(body: ExamSessionInput[]): Promise<ExamSession[]> {
    if (body.length === 0) throw new Error("exam-session details required to be added")
    const resp = await authenticatedPost({ uri: "/exam-session", body })
    return await resp.json()
}
