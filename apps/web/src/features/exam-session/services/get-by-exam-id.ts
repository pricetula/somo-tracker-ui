import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ExamSession } from "../types";

export async function getExamSessionsByExamID(examID: string): Promise<ExamSession[] | null> {
    const resp = await authenticatedGet({ uri: `/exam-session/${examID}` })
    return await resp.json();
}
