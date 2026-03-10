"use client";

import { useRouter } from "next/navigation";
import { CsvImporter } from "@/components/importer/csv-importer";
import { bulkAddFaculty } from "@/features/faculty/api/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AddFacultyModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  async function handleImport(...args: Parameters<typeof bulkAddFaculty>) {
    const result = await bulkAddFaculty(...args);
    if (result.success) {
      router.refresh();
    }
    return result;
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add faculty</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import faculty members into your school.
          </DialogDescription>
        </DialogHeader>
        <CsvImporter onImport={handleImport} />
      </DialogContent>
    </Dialog>
  );
}
