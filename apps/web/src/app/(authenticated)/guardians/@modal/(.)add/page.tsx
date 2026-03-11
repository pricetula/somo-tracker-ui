"use client";

import { useRouter } from "next/navigation";
import { CsvImporter } from "@/components/shared/importer/csv-importer";
import { bulkAddGuardians } from "@/features/guardians/api/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AddGuardiansModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  async function handleImport(...args: Parameters<typeof bulkAddGuardians>) {
    const result = await bulkAddGuardians(...args);
    if (result.success) {
      router.refresh();
    }
    return result;
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add guardians</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import guardians into your school.
          </DialogDescription>
        </DialogHeader>
        <CsvImporter onImport={handleImport} />
      </DialogContent>
    </Dialog>
  );
}
