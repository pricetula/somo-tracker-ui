"use client"

import React, { useRef, useState } from "react"
import { CircleUser, GraduationCap } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Role } from "@/shared/types/user"
import { Button } from "@/shared/components/ui/button"
import { useSchoolsUIStore } from "../../store"
import { InvitedUsers } from "./InvitedUsers"

export function UserInviteDialog() {
    const [selectedRole, setSelectedRole] = useState<Role | "">("")
    const setInviteUsersDialog = useSchoolsUIStore((s) => s.setInviteUsersDialog)
    const inviteUsersDialogOpen = useSchoolsUIStore((s) => s.inviteUsersDialogOpen)

    const ref = useRef(null)

    function handleOnOpenChange(v: boolean) {
        if (!v) {
            setInviteUsersDialog(false)
            setSelectedRole("")
        }
    }

    function handleButtonClick() {
        (ref.current as any)?.handleSubmit();
        handleOnOpenChange(false)
    }

    return (
        <Dialog open={inviteUsersDialogOpen} onOpenChange={handleOnOpenChange}>
            <DialogContent className="w-[90%] max-w-[600px]">
                <DialogHeader className="text-left">
                    <DialogTitle>{(
                        !selectedRole && "Invite Admin/ Faculty or Guardians Your Way" ||
                        selectedRole === "FACULTY" && "Invite Admin/ Faculty" ||
                        selectedRole === "GUARDIAN" && "Invite Guardians"
                    )}</DialogTitle>
                    <DialogDescription>
                        {`${!selectedRole ? 'First, choose either Faculty or Guardians. Then a' : 'A'}dd emails manually or upload a CSV/Excel file, we’ll send the invites for you.`}
                    </DialogDescription>
                </DialogHeader>

                <article>
                    {
                        !selectedRole
                            ? (
                                <div className="h-[300px] flex gap-4 items-center justify-center">
                                    <Button onClick={() => setSelectedRole("FACULTY")}>
                                        <GraduationCap />
                                        <span>Faculty</span>
                                    </Button>
                                    <Button onClick={() => setSelectedRole("GUARDIAN")}>
                                        <CircleUser />
                                        <span>Guardians</span>
                                    </Button>
                                </div>
                            )
                            : (
                                <InvitedUsers role={selectedRole} ref={ref} />
                            )
                    }
                </article>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleButtonClick}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}