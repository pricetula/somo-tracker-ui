import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { GuardianStudent } from "../types";

export async function getGuardianStudentsBySchoolID(id: string): Promise<GuardianStudent[]> {
    const resp = await authenticatedGet({ uri: `/guardian-student/school/${id}` })
    return await resp.json();
}
