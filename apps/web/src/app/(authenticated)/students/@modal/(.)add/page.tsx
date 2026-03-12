"use client";

import { useRouter } from "next/navigation";
import { UserCreatorModal } from "@/components/shared/user-creator/user-creator-modal";
import { bulkAddStudents } from "@/features/students/api/actions";

export default function AddStudentsModal() {
    const router = useRouter();

    async function handleImport(...args: Parameters<typeof bulkAddStudents>) {
        const result = await bulkAddStudents(...args);
        if (result.success) router.refresh();
        return result;
    }

    return (
        <UserCreatorModal
            title="Add students"
            description="Upload a CSV file to import students into your school."
            onImport={handleImport}
            onClose={() => router.back()}
        />
    );
}
