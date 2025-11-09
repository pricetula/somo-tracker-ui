import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { ExamInput, Exam } from "../types";

export async function addExams(i: ExamInput[]): Promise<Exam[]> {
    if (i.length === 0) throw new Error("exam details required to be added")
    const resp = await authenticatedPost({ uri: "/exams", body: i })
    return await resp.json()
}
