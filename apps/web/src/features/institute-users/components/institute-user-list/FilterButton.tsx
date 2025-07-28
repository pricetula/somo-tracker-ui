import React from "react"
import { ListFilter } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

import { roleOptions } from "@/shared/utils/constants"

interface FilterButtonProps {
    onCheckedRoles: (checkedRoles: string[]) => void
}

export function FilterButton({ onCheckedRoles }: FilterButtonProps) {
    const [checkedRoles, setCheckedRoles] = React.useState<string[]>([])

    function handleClickedCheckbox(e: any, roleValue: string) {
        e.preventDefault()
        const isRoleChecked = checkedRoles.includes(roleValue)
        const l = !isRoleChecked
            ? [...checkedRoles, roleValue]
            : checkedRoles.filter((role) => role !== roleValue)
        setCheckedRoles(l)
        onCheckedRoles(l)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    id="filter"
                >
                    <ListFilter />
                    <span>Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Roles</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {roleOptions.map((role) => (
                                <DropdownMenuItem key={role.value} onClick={(e) => handleClickedCheckbox(e, role.value)}>
                                    <Checkbox
                                        checked={checkedRoles.includes(role.value)}
                                    />
                                    <span>{role.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
