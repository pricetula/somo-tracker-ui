import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { GuardianStudent } from "../types";

export async function addGuardianStudents(body: GuardianStudent[]): Promise<GuardianStudent[]> {
    if (body.length === 0) throw new Error("guardian-student details required to be added")
    const resp = await authenticatedPost({ uri: "/guardian-student", body })
    return await resp.json()
}
