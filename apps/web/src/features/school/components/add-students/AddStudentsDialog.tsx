"use client"

import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { useSchoolsUIStore } from "../../store"

export function AddStudentsDialog() {
    const setAddStudentsDialog = useSchoolsUIStore((s) => s.setAddStudentsDialog)
    const addStudentsDialogOpen = useSchoolsUIStore((s) => s.addStudentsDialogOpen)

    function handleOnOpenChange(v: boolean) {
        if (!v) {
            setAddStudentsDialog(false)
        }
    }

    return (
        <Dialog open={addStudentsDialogOpen} onOpenChange={handleOnOpenChange}>
            <DialogContent className="w-[90%] max-w-[600px]">
                <DialogHeader className="text-left">
                    <DialogTitle>Add students</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum....
                    </DialogDescription>
                </DialogHeader>

                <article>
                    add students part
                </article>
            </DialogContent>
        </Dialog>
    )
}