"use client"

import { MailPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSchoolsUIStore } from "../../store";

export function UserInviteButton() {
    const toggleInviteUsersDialog = useSchoolsUIStore((s) => s.toggleInviteUsersDialog)

    return (
        <Button variant="secondary" size="sm" onClick={toggleInviteUsersDialog}>
            <MailPlus />
            <span>Invite</span>
        </Button >
    )
}