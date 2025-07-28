import { cn } from "@/shared/lib/utils"
import { mappedRoles } from "@/shared/utils/constants"
import React from "react"

interface ActiveFilterRolesProps {
    filteredRoles: string[]
}


export function ActiveFilterRoles({ filteredRoles }: ActiveFilterRolesProps) {
    if (filteredRoles.length === 0) return null

    const rolesWithDetails = React.useMemo(
        () => filteredRoles.map((role) => {
            const roleDetails = mappedRoles.get(role)
            if (!roleDetails) return null
            return {
                label: roleDetails.label,
                bgColor: roleDetails.bgColor,
            }
        })
        , [filteredRoles])

    React.useEffect(() => {
        console.log(rolesWithDetails)
    }, [rolesWithDetails])

    return (
        <div className="flex items-center gap-2 pr-2 border-r">
            <span>{`Role${rolesWithDetails.length === 1 ? "" : "s"}`}</span>
            {
                (rolesWithDetails.length === 1)
                    ? (
                        <span>
                            <span>{rolesWithDetails?.[0]?.label}</span>
                            <div className={cn("rounded-full h-4 w-4", rolesWithDetails?.[0]?.bgColor)} />
                        </span>
                    )
                    : <div>sss</div>
            }
        </div>
    )
}