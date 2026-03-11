"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type {
  SchoolUser,
  SchoolUserSearchResponse,
  AddSchoolUserRequest,
  UpdateSchoolUserRequest,
} from "@/features/school-users/types";
import type { SchoolUsersParams } from "./fetch-school-users";

export async function getSchoolUsers(params: SchoolUsersParams = {}): Promise<ActionResult<SchoolUserSearchResponse>> {
  try {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.role) query.set("role", params.role);
    if (params.limit !== undefined) query.set("limit", String(params.limit));
    if (params.offset !== undefined) query.set("offset", String(params.offset));
    const path = query.size ? `/school-users?${query}` : "/school-users";
    const res = await apiClient(path);
    if (!res.ok) return { success: false, error: "Failed to fetch school users.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function addSchoolUsers(body: AddSchoolUserRequest[]): Promise<ActionResult<SchoolUser[]>> {
  try {
    const res = await apiClient("/school-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { success: false, error: "Failed to add school users.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateSchoolUser(body: UpdateSchoolUserRequest): Promise<ActionResult<SchoolUser>> {
  try {
    const res = await apiClient("/school-users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { success: false, error: "Failed to update school user.", code: res.status };
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
