"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { AddUser } from "@/lib/importer-engine";

export async function bulkAddStudents(students: AddUser[]): Promise<ActionResult<void>> {
  try {
    const res = await apiClient("/students", {
      method: "POST",
      body: JSON.stringify(students),
    });
    if (!res.ok) return { success: false, error: "Failed to import students.", code: res.status };
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
