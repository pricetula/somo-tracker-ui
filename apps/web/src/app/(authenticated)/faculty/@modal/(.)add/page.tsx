"use client";

import { useRouter } from "next/navigation";
import { UserCreatorModal } from "@/components/shared/user-creator/user-creator-modal";
import { bulkAddFaculty } from "@/features/faculty/api/actions";

export default function AddFacultyModal() {
    const router = useRouter();

    async function handleImport(...args: Parameters<typeof bulkAddFaculty>) {
        const result = await bulkAddFaculty(...args);
        if (result.success) router.refresh();
        return result;
    }

    return (
        <UserCreatorModal
            title="Add faculty"
            description="Upload a CSV file to import faculty members into your school."
            onImport={handleImport}
            onClose={() => router.back()}
        />
    );
}
