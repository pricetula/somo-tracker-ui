"use client";

import { UserCreator } from "@/components/shared/user-creator/user-creator";
import { bulkAddGuardians } from "@/features/guardians/api/actions";
import { USER_CREATOR_CONFIG } from "../configs";

export default function AddGuardiansPage() {
    return (
        <div className="flex flex-col gap-4">
            <UserCreator onImport={bulkAddGuardians} config={USER_CREATOR_CONFIG} />
        </div>
    );
}
