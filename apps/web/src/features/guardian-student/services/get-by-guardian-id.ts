import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { GuardianStudent } from "../types";

export async function getGuardianStudentsByGuardianID(id: string): Promise<GuardianStudent[]> {
    const resp = await authenticatedGet({ uri: `/guardian-student/guardian/${id}` })
    return await resp.json();
}
