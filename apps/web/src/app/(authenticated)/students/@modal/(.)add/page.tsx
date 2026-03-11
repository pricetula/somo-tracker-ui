"use client";

import { useRouter } from "next/navigation";
import { CsvImporter } from "@/components/shared/importer/csv-importer";
import { bulkAddStudents } from "@/features/students/api/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AddStudentsModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  async function handleImport(...args: Parameters<typeof bulkAddStudents>) {
    const result = await bulkAddStudents(...args);
    if (result.success) {
      router.refresh();
    }
    return result;
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => { if (!open) handleClose(); }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add students</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import students into your school.
          </DialogDescription>
        </DialogHeader>
        <CsvImporter onImport={handleImport} />
      </DialogContent>
    </Dialog>
  );
}
