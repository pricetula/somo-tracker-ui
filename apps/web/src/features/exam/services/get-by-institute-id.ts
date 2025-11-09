import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Exam } from "../types";

export async function getExams(): Promise<Exam[] | null> {
    const resp = await authenticatedGet({ uri: "/exams" })
    return await resp.json();
}
