"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type {
    SchoolUser,
    SchoolUserSearchResponse,
    AddSchoolUserRequest,
    UpdateSchoolUserRequest,
    DeleteSchoolUsersRequest,
    UpdateUserRequest,
    StudentProfile,
    FacultyProfile,
    GuardianProfile,
    AdminProfile,
} from "@/features/school-users/types";
import type { SchoolUsersParams } from "./fetch-school-users";

export async function getSchoolUsers(
    params: SchoolUsersParams = {}
): Promise<ActionResult<SchoolUserSearchResponse>> {
    try {
        const query = new URLSearchParams();
        if (params.search) query.set("search", params.search);
        if (params.role) query.set("role", params.role);
        if (params.limit !== undefined) query.set("limit", String(params.limit));
        if (params.offset !== undefined) query.set("offset", String(params.offset));
        const path = query.size ? `/school-users?${query}` : "/school-users";
        const res = await apiClient(path);
        if (!res.ok)
            return { success: false, error: "Failed to fetch school users.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function addSchoolUsers(
    body: AddSchoolUserRequest[]
): Promise<ActionResult<SchoolUser[]>> {
    try {
        const res = await apiClient("/school-users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!res.ok)
            return { success: false, error: "Failed to add school users.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function deleteSchoolUsers(
    body: DeleteSchoolUsersRequest
): Promise<ActionResult<void>> {
    try {
        const res = await apiClient("/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!res.ok) return { success: false, error: await res.text(), code: res.status };
        return { success: true, data: undefined };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function updateSchoolUser(
    body: UpdateSchoolUserRequest
): Promise<ActionResult<SchoolUser>> {
    try {
        const res = await apiClient("/school-users", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!res.ok)
            return { success: false, error: "Failed to update school user.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function updateUser(
    userId: string,
    body: UpdateUserRequest
): Promise<ActionResult<UpdateUserRequest>> {
    try {
        const res = await apiClient("/users", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...body, id: userId }),
        });
        if (!res.ok) return { success: false, error: "Failed to update user.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function getStudentProfile(userId: string): Promise<ActionResult<StudentProfile>> {
    try {
        const res = await apiClient(`/students/${userId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch student profile.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function getFacultyProfile(userId: string): Promise<ActionResult<FacultyProfile>> {
    try {
        const res = await apiClient(`/faculty/${userId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch faculty profile.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function getGuardianProfile(userId: string): Promise<ActionResult<GuardianProfile>> {
    try {
        const res = await apiClient(`/guardians/${userId}`);
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

export async function getAdminProfile(userId: string): Promise<ActionResult<AdminProfile>> {
    try {
        const res = await apiClient(`/admins/${userId}`);
        if (!res.ok)
            return { success: false, error: "Failed to fetch admin profile.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
