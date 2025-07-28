import { X } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Badge } from "@/shared/components/ui/badge"
import { mappedRoles } from "@/shared/utils/constants"
import React from "react"

interface ActiveFilterRolesProps {
    filteredRoles: string[]
    onRemoveRole(role: string): void
}


export function ActiveFilterRoles({ filteredRoles, onRemoveRole }: ActiveFilterRolesProps) {
    if (filteredRoles.length === 0) return null

    const rolesWithDetails = React.useMemo(
        () => filteredRoles.map((role) => {
            const roleDetails = mappedRoles.get(role)
            if (!roleDetails) return null
            return {
                value: roleDetails.value,
                label: roleDetails.label,
                bgColor: roleDetails.bgColor,
            }
        }).filter((role) => !!role && role !== null)
        , [filteredRoles])

    return (
        <div className="flex items-center gap-1 pr-2 border-r text-xs">
            {
                rolesWithDetails.map((role) => (
                    <Badge key={role.label} className={cn(
                        "text-foreground flex items-center gap-1",
                        `${role.bgColor} hover:${role.bgColor}`,
                    )}>
                        <span>{role.label}</span>
                        <button onClick={() => onRemoveRole(role.value)}>
                            <X size={12} className="cursor-pointer" />
                        </button>
                    </Badge>
                ))
            }
        </div>
    )
}