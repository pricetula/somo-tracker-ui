"use client"

import { useMemo } from "react"
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    flexRender,
} from "@tanstack/react-table"
import { SchoolUser } from "../../types"
import { cn } from "@/shared/lib/utils"
import { RoleSelector } from "@/shared/components/role-selector"

interface UserListProps {
    initialisedUsers: SchoolUser[]
}

const columnHelper = createColumnHelper()

export function UserList({ initialisedUsers }: UserListProps) {
    const columnWidths: Record<string, string> = {
        email: "w-[200px]",
        first_name: "w-[200px]",
        last_name: "w-[200px]",
        phone: "w-[200px]",
        role: "w-[100px]",
    }

    const columns = useMemo<any>(
        () => [
            columnHelper.accessor("user.email", {
                id: "email",
                header: "Email",
                cell: (info) => info.getValue() || "-",
            }),
            columnHelper.accessor("user.first_name", {
                id: "first_name",
                header: "First Name",
                cell: (info) => info.getValue() || "-",
            }),
            columnHelper.accessor("user.last_name", {
                id: "last_name",
                header: "Last Name",
                cell: (info) => info.getValue() || "-",
            }),
            columnHelper.accessor("user.phone", {
                id: "phone",
                header: "Phone",
                cell: (info) => info.getValue() || "-",
            }),
            columnHelper.accessor("role", {
                id: "role",
                header: "Role",
                cell: (info: any) => (
                    <RoleSelector
                        id={info.column.id}
                        value={info.getValue()}
                        onSetValue={console.log}
                    />
                ),
            }),
        ],
        []
    )

    const table = useReactTable({
        data: initialisedUsers,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className="w-full overflow-auto">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className={cn("px-6 py-3 text-left font-medium", header?.column?.id ? columnWidths[header.column.id] : "")}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="divide-y">
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-6 py-4">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}