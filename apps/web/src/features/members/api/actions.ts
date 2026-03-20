"use server";

import { apiClient } from "@/lib/api-client";
import type { AddUser } from "@/lib/importer-engine";

export type MemberRole = "student" | "teacher" | "admin" | "parent";

export async function addMembersInBulk(
    users: AddUser[],
    role: MemberRole
): Promise<{ success: boolean; error?: string }> {
    try {
        if (role === "student") {
            const students = users.map((u) => ({
                first_name: u.first_name,
                last_name: u.last_name,
                ...(u.email ? { email: u.email } : {}),
                ...(u.phone ? { phone: u.phone } : {}),
                ...(u.registration_number ? { registration_number: u.registration_number } : {}),
                ...(u.student_group_id ? { student_group_id: u.student_group_id } : {}),
            }));

            const response = await apiClient("/students", {
                method: "POST",
                body: JSON.stringify({ students }),
            });

            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                const message = (body as { message?: string }).message ?? "Failed to add students.";
                return { success: false, error: message };
            }

            return { success: true };
        }

        const invitations = users
            .filter((u) => u.email)
            .map((u) => ({
                email: u.email!,
                role,
                first_name: u.first_name,
                last_name: u.last_name,
                ...(u.phone ? { phone: u.phone } : {}),
                ...(u.registration_number ? { registration_number: u.registration_number } : {}),
            }));

        if (invitations.length === 0) {
            return { success: true };
        }

        const response = await apiClient("/invitations", {
            method: "POST",
            body: JSON.stringify({ invitations }),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            const message = (body as { message?: string }).message ?? "Failed to send invitations.";
            return { success: false, error: message };
        }

        return { success: true };
    } catch {
        return { success: false, error: "An unexpected error occurred." };
    }
}
