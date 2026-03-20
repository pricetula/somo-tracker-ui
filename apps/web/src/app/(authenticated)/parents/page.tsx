"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCreatorModal } from "@/components/shared/user-creator/user-creator-modal";
import { addMembersInBulk } from "@/features/members/api/actions";
import type { AddUser } from "@/lib/importer-engine";

export default function ParentsPage() {
    const [open, setOpen] = useState(false);

    async function handleImport(users: AddUser[]) {
        return addMembersInBulk(users, "parent");
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Parents</h1>
                <Button onClick={() => setOpen(true)}>Add parents</Button>
            </div>

            {open && (
                <UserCreatorModal
                    title="Add parents"
                    description="Add parents manually, via CSV, or Excel."
                    onImport={handleImport}
                    onClose={() => setOpen(false)}
                    config={{ emailOptional: false }}
                />
            )}
        </div>
    );
}
