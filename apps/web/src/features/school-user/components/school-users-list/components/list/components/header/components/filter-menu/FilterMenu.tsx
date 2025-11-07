"use client"

import { ListFilter, CircleUserRound, Building, UsersRound } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Role } from "@/features/user/types"
import { RoleDisplay } from "@/shared/components/role-display"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { useSchoolUsersContext } from "@/features/school-user/context/school-users-param"

export function FilterMenu() {
    const { filters, onSearchParamsChange } = useSchoolUsersContext()

    const userRoles = Object.keys(Role).map(role => role)

    return (
        <div className="flex gap-4 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                        <ListFilter size="12" />
                        <span>Filter</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <CircleUserRound />
                                <span>Roles</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {
                                        userRoles.map(role => {
                                            const checked = filters.roles.includes(role as Role)
                                            return (
                                                <DropdownMenuItem
                                                    key={role}
                                                    onClick={() => onSearchParamsChange({
                                                        ...filters,
                                                        roles: checked
                                                            ? filters.roles.filter(r => r !== role as Role)
                                                            : [...filters.roles, role as Role]
                                                    })}
                                                >
                                                    <Checkbox checked={checked} />
                                                    <RoleDisplay role={role as Role} />
                                                </DropdownMenuItem>
                                            )
                                        })
                                    }
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuItem>
                            <Building />
                            <span>School staff</span>
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger disabled>
                                <UsersRound />
                                <span>Cohorts</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>Email</DropdownMenuItem>
                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>More...</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* <ul>
                {
                    filters.roles.map(role => {
                        return (
                            <li key={role}>
                                <RoleDisplay role={role} />
                            </li>
                        )
                    })
                }
            </ul> */}
        </div>
    )
}
