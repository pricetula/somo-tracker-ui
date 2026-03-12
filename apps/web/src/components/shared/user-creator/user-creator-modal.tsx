"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import type { AddUser } from "@/lib/importer-engine";
import type { Cohort } from "@/features/cohorts/types";
import { UserCreator, type UserCreatorConfig } from "./user-creator";

interface UserCreatorModalProps {
    title: string;
    description: string;
    onImport: (users: AddUser[]) => Promise<{ success: boolean; error?: string }>;
    onClose: () => void;
    config?: UserCreatorConfig;
    cohorts?: Cohort[];
}

export function UserCreatorModal({ title, description, onImport, onClose, config, cohorts }: UserCreatorModalProps) {
    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <UserCreator onImport={onImport} config={config} cohorts={cohorts} />
            </DialogContent>
        </Dialog>
    );
}
