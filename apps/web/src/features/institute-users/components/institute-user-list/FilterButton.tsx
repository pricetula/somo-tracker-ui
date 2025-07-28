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
    selectedRoles: string[]
    onCheckedRoles: (checkedRoles: string[]) => void
}

export function FilterButton({ selectedRoles, onCheckedRoles }: FilterButtonProps) {
    function handleClickedCheckbox(e: any, roleValue: string) {
        e.preventDefault()
        const isRoleChecked = selectedRoles.includes(roleValue)
        const l = !isRoleChecked
            ? [...selectedRoles, roleValue]
            : selectedRoles.filter((role) => role !== roleValue)
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
                                        checked={selectedRoles.includes(role.value)}
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
