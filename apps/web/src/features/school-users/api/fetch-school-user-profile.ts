import { browserApiClient } from "@/lib/browser-api-client";
import type { ActionResult } from "@/types/action-result";
import type {
    StudentProfile,
    FacultyProfile,
    GuardianProfile,
    AdminProfile,
} from "@/features/school-users/types";

export async function fetchStudentProfile(userId: string): Promise<ActionResult<StudentProfile>> {
    try {
        const res = await browserApiClient(`/students/${userId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch student profile.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function fetchFacultyProfile(userId: string): Promise<ActionResult<FacultyProfile>> {
    try {
        const res = await browserApiClient(`/faculty/${userId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch faculty profile.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function fetchGuardianProfile(userId: string): Promise<ActionResult<GuardianProfile>> {
    try {
        const res = await browserApiClient(`/guardians/${userId}`);
        if (!res.ok)
            return {
                success: false,
                error: "Failed to fetch guardian profile.",
                code: res.status,
            };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function fetchAdminProfile(userId: string): Promise<ActionResult<AdminProfile>> {
    try {
        const res = await browserApiClient(`/admins/${userId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch admin profile.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
