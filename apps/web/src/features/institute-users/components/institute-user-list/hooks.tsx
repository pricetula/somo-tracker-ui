"use client"

import * as React from "react"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import {
    Edit,
    Trash,
    MoreHorizontal,
} from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { RoleSelector } from "@/shared/components/role-selector"
import { InstituteUsers } from "../../types"

export function useInstituteUsersColumns(
    handleRequestUpdateInstituteUserRole: (instituteUsers: InstituteUsers) => void
): () => ColumnDef<InstituteUsers>[] {
    return React.useCallback(() => {
        return [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                meta: {
                    className: "w-[20px] min-w-[20px] max-w-[20px]",
                },
                enableSorting: false,
                enableHiding: false,
            },
            {
                id: "name",
                accessorFn: row => `${row.user.first_name || ""} ${row.user.last_name || ""}`,
                header: "Name",
                cell: ({ getValue, row }) => {
                    const name = getValue() as string
                    const abbreviatedName = name[0]
                    return (
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={row.original.user.photo_url} alt={name} />
                                <AvatarFallback className="rounded-lg">{abbreviatedName}</AvatarFallback>
                            </Avatar>
                            <span>{name}</span>
                        </div>
                    )
                },
                meta: {
                    className: "w-[400px]",
                },
            },
            {
                id: "email",
                accessorFn: row => row.user.email || "",
                header: "Email",
                cell: ({ getValue }) => {
                    const email = getValue() as string
                    if (!email) return "-"
                    return (<a className="lowercase" href={`mailto:${email}`}>{email}</a>)
                },
                meta: {
                    className: "w-[300px]",
                },
            },
            {
                id: "phone",
                accessorFn: row => row.user.phone || "",
                header: "Phone",
                cell: ({ getValue }) => (getValue() || "-") as string,
                meta: {
                    className: "w-[300px]",
                },
            },
            {
                id: "role",
                accessorFn: row => row.role || "",
                header: () => (<span className="pl-4">Role</span>),
                meta: {
                    className: "w-[80px]",
                },
                cell: ({ getValue, row, table }) => {
                    const role = (getValue()) as string
                    return (
                        <RoleSelector
                            id="role"
                            value={role}
                            onSetValue={(val) => {
                                if (val === role) return
                                row.original.role = val
                                handleRequestUpdateInstituteUserRole(row.original)
                            }}
                        />
                    )
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const me = row.original

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Edit />
                                    <span>
                                        Edit
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 focus:bg-red-100 focus:text-red-600">
                                    <Trash />
                                    <span>
                                        Delete
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                },
            },
        ]
    }, [])
}