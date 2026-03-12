"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type {
    GuardianStudent,
    AddGuardianStudentRequest,
    DeleteGuardianStudentRequest,
} from "@/features/guardian-students/types";

export async function getGuardianStudentsByGuardian(
    guardianId: string
): Promise<ActionResult<GuardianStudent[]>> {
    try {
        const res = await apiClient(`/guardian-students/guardian/${guardianId}`);
        if (!res.ok)
            return {
                success: false,
                error: "Failed to fetch guardian students.",
                code: res.status,
            };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function createGuardianStudents(
    body: AddGuardianStudentRequest[]
): Promise<ActionResult<GuardianStudent[]>> {
    try {
        const res = await apiClient("/guardian-students", {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (!res.ok)
            return {
                success: false,
                error: "Failed to create guardian student links.",
                code: res.status,
            };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function deleteGuardianStudent(
    body: DeleteGuardianStudentRequest
): Promise<ActionResult<void>> {
    try {
        const res = await apiClient("/guardian-students", {
            method: "DELETE",
            body: JSON.stringify(body),
        });
        if (!res.ok)
            return {
                success: false,
                error: "Failed to delete guardian student link.",
                code: res.status,
            };
        return { success: true };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
