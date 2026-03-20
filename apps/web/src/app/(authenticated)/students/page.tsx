"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCreatorModal } from "@/components/shared/user-creator/user-creator-modal";
import { addMembersInBulk } from "@/features/members/api/actions";
import type { AddUser } from "@/lib/importer-engine";

export default function StudentsPage() {
    const [open, setOpen] = useState(false);

    async function handleImport(users: AddUser[]) {
        return addMembersInBulk(users, "student");
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Students</h1>
                <Button onClick={() => setOpen(true)}>Add students</Button>
            </div>

            {open && (
                <UserCreatorModal
                    title="Add students"
                    description="Add students manually, via CSV, or Excel."
                    onImport={handleImport}
                    onClose={() => setOpen(false)}
                    config={{ emailOptional: true, showRegistrationNumber: true }}
                />
            )}
        </div>
    );
}
