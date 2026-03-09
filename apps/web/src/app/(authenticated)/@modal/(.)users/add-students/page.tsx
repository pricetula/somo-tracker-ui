"use client"

import { useRouter } from "next/navigation"
import { CsvImporter } from "@/components/importer/csv-importer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function AddStudentsModal() {
  const router = useRouter()

  function handleClose() {
    router.back()
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) handleClose() }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add students</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import students into your school.
          </DialogDescription>
        </DialogHeader>
        <CsvImporter />
      </DialogContent>
    </Dialog>
  )
}
