"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"

export default function Page() {
    const router = useRouter()

    function handleOnOpenChange(open: boolean) {
        if (!open) {
            router.back()
        }
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={handleOnOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create School</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new school
                    </DialogDescription>
                </DialogHeader>

                Create school modal
                {/* <CreateSchool /> */}
            </DialogContent>
        </Dialog>
    )
}