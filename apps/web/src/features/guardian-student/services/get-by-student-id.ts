import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { GuardianStudent } from "../types";

export async function getGuardianStudentsByStudentID(id: string): Promise<GuardianStudent[]> {
    const resp = await authenticatedGet({ uri: `/guardian-student/student/${id}` })
    return await resp.json();
}
