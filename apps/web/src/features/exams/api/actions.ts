"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionResult } from "@/types/action-result";
import type { Exam, AddExamRequest, UpdateExamRequest } from "@/features/exams/types";

export async function getExams(): Promise<ActionResult<Exam[]>> {
  try {
    const res = await apiClient("/exams");

    if (!res.ok) {
      return { success: false, error: "Failed to fetch exams.", code: res.status };
    }

    const data: Exam[] = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function getExam(id: string): Promise<ActionResult<Exam>> {
  try {
    const res = await apiClient(`/exams/${id}`);

    if (!res.ok) {
      return { success: false, error: "Failed to fetch exam.", code: res.status };
    }

    const data: Exam = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function createExams(body: AddExamRequest[]): Promise<ActionResult<Exam[]>> {
  try {
    const res = await apiClient("/exams", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to create exams.", code: res.status };
    }

    const data: Exam[] = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function updateExam(body: UpdateExamRequest): Promise<ActionResult<Exam>> {
  try {
    const res = await apiClient("/exams", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to update exam.", code: res.status };
    }

    const data: Exam = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}

export async function deleteExams(ids: string[]): Promise<ActionResult<void>> {
  try {
    const res = await apiClient("/exams", {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to delete exams.", code: res.status };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Unable to reach the server.", code: 503 };
  }
}
