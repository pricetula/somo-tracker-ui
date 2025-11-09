import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { Exam } from "../types";

export async function updateExam(i: Exam): Promise<Exam> {
    const resp = await authenticatedPut({ uri: "/exams", body: i })
    return await resp.json()
}
