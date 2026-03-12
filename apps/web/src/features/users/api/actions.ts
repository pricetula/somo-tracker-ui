"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { User, UpdateUserRequest } from "@/features/users/types";

export async function getUser(id: string): Promise<ActionResult<User>> {
    try {
        const res = await apiClient(`/users/${id}`);
        if (!res.ok) return { success: false, error: "Failed to fetch user.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}

export async function updateUser(body: UpdateUserRequest): Promise<ActionResult<User>> {
    try {
        const res = await apiClient("/users", { method: "PUT", body: JSON.stringify(body) });
        if (!res.ok) return { success: false, error: "Failed to update user.", code: res.status };
        return { success: true, data: await res.json() };
    } catch {
        return { success: false, error: "Unable to reach the server.", code: 503 };
    }
}
