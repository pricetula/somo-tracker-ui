"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SchoolForm } from "@/features/school/components/school-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function CreateSchoolModal() {
  const router = useRouter()

  function handleClose() {
    router.back()
  }

  function handleSuccess() {
    toast.success("School created successfully.")
    router.back()
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) handleClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create school</DialogTitle>
          <DialogDescription>
            Add a new school to your institute.
          </DialogDescription>
        </DialogHeader>
        <SchoolForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
