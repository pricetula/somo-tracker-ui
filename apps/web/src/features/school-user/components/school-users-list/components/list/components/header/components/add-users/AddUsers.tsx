import { UserPlusIcon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import React from "react"

export function AddUsers() {
    return (
        <Button size="sm" variant="outline">
            <UserPlusIcon size="12" />
            <span>User</span>
        </Button>
    )
}