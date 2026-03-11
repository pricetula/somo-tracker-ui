"use client";

import { useRouter } from "next/navigation";
import { ImportModal } from "@/components/shared/import-modal";
import { bulkAddGuardians } from "@/features/guardians/api/actions";

export default function AddGuardiansModal() {
  const router = useRouter();

  async function handleImport(...args: Parameters<typeof bulkAddGuardians>) {
    const result = await bulkAddGuardians(...args);
    if (result.success) router.refresh();
    return result;
  }

  return (
    <ImportModal
      title="Add guardians"
      description="Upload a CSV file to import guardians into your school."
      onImport={handleImport}
      onClose={() => router.back()}
    />
  );
}
