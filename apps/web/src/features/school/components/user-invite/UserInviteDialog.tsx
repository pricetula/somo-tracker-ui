"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Role } from "@/shared/types/user"
import { useSchoolsUIStore } from "../../store"
import { Button } from "@/shared/components/ui/button"
import { CircleUser, GraduationCap } from "lucide-react"

export function UserInviteDialog() {
    const [selectedRole, setSelectedRole] = useState<Role | "">("")
    const setInviteUsersDialog = useSchoolsUIStore((s) => s.setInviteUsersDialog)
    const inviteUsersDialogOpen = useSchoolsUIStore((s) => s.inviteUsersDialogOpen)

    function handleOnOpenChange(v: boolean) {
        if (!v) {
            setSelectedRole("")
            setInviteUsersDialog(false)
        }
    }

    return (
        <Dialog open={inviteUsersDialogOpen} onOpenChange={handleOnOpenChange}>
            <DialogContent className="w-[90%] max-w-[600px]">
                <DialogHeader className="text-left">
                    <DialogTitle>{(
                        !selectedRole && "Invite Faculty or Guardians Your Way" ||
                        selectedRole === "FACULTY" && "Invite Faculty" ||
                        selectedRole === "GUARDIAN" && "Invite Guardians"
                    )}</DialogTitle>
                    <DialogDescription>
                        First, choose either Faculty or Guardians. Then add emails manually or upload a CSV/Excel file, we’ll send the invites for you.
                    </DialogDescription>
                </DialogHeader>

                <article className="h-[300px]">
                    {
                        !selectedRole
                            ? (
                                <div className="h-full flex gap-4 items-center justify-center">
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
                                <div>
                                    Table
                                </div>
                            )
                    }
                </article>
            </DialogContent>
        </Dialog>
    )
}