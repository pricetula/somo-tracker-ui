"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InviteUserForm } from "@/features/invitations/components/invite-user-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function InviteUserModal() {
    const router = useRouter();

    function handleClose() {
        router.back();
    }

    function handleSuccess() {
        toast.success("Invitation sent successfully.");
        router.back();
    }

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite user</DialogTitle>
                    <DialogDescription>
                        Send an invitation email to add a new user to your school.
                    </DialogDescription>
                </DialogHeader>
                <InviteUserForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
