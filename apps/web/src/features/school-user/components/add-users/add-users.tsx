import React, { useCallback, useState } from "react"
import { UserPlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"

export function AddUsers() {
    const [open, setOpen] = useState<boolean>(false)

    const handleOnOpenChange = useCallback(
        (v: boolean) => setOpen(v),
        []
    )

    return (
        <>
            <Button size="sm" variant="outline" onClick={() => handleOnOpenChange(true)}>
                <UserPlusIcon size="12" />
                <span>Add</span>
            </Button>

            <Dialog open={open} onOpenChange={handleOnOpenChange}>
                <DialogContent className="w-[90%] max-w-[600px] h-[200px]">
                    <DialogHeader className="flex flex-col items-center text-left mb-4">
                        <DialogTitle>Add new users</DialogTitle>
                        <DialogDescription>
                            You can choose to either add new students or invite faculty or guardian members.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-center gap-4">
                        <Button variant="secondary" asChild>
                            <Link href="/users/new-students">Add students</Link>
                        </Button>
                        <Button>
                            <Link href="/users/invitation/new">Invite faculty or guardians</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}