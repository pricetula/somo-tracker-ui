"use client";

import { useRouter } from "next/navigation";
import { UserCreatorModal } from "@/components/shared/user-creator/user-creator-modal";
import { bulkAddGuardians } from "@/features/guardians/api/actions";

export default function AddGuardiansModal() {
  const router = useRouter();

  async function handleImport(...args: Parameters<typeof bulkAddGuardians>) {
    const result = await bulkAddGuardians(...args);
    if (result.success) router.refresh();
    return result;
  }

  return (
    <UserCreatorModal
      title="Add guardians"
      description="Upload a CSV file to import guardians into your school."
      onImport={handleImport}
      onClose={() => router.back()}
    />
  );
}
