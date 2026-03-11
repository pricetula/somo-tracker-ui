"use client";

import { useRouter } from "next/navigation";
import { ImportModal } from "@/components/shared/import-modal";
import { bulkAddStudents } from "@/features/students/api/actions";

export default function AddStudentsModal() {
  const router = useRouter();

  async function handleImport(...args: Parameters<typeof bulkAddStudents>) {
    const result = await bulkAddStudents(...args);
    if (result.success) router.refresh();
    return result;
  }

  return (
    <ImportModal
      title="Add students"
      description="Upload a CSV file to import students into your school."
      onImport={handleImport}
      onClose={() => router.back()}
    />
  );
}
