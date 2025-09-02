"use client"

import { UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSchoolsUIStore } from "../../store";

export function AddStudentsButton() {
    const toggleAddStudentsDialog = useSchoolsUIStore((s) => s.toggleAddStudentsDialog)

    return (
        <Button variant="secondary" size="sm" onClick={toggleAddStudentsDialog}>
            <UserPlus />
            <span>Add Students</span>
        </Button >
    )
}