"use client"

import React, { useEffect, useMemo } from "react"
import Link from "next/link"
import { useVirtualizer } from "@tanstack/react-virtual"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useSearchParams } from "next/navigation"
import { RoleSelector } from "@/shared/components/role-selector"
import { useSchoolUsersQuery } from "../../hooks/useSchoolUsersQuery"
import { getSchoolUsersFilterFromSearchParam } from "../../utils/getSchoolUsersFilterFromSearchParam"
import { SchoolUser, UpdateSchoolUserRole } from "../../types"
import { useUpdateSchoolUserRoleMutation } from "../../hooks/update-school-user-role-mutation"
import { Role } from "@/features/user/types"
import { toast } from "sonner"

const columnHelper = createColumnHelper<SchoolUser>()

export function SchoolUsersList() {
    const columns = useMemo(
        () => [
            columnHelper.accessor('user', {
                header: 'User',
                size: 200,
                cell: (info) => {
                    const user = info.getValue()
                    return (
                        <Link
                            href={`/users/${user.id}`}
                        >
                            {user.first_name} {user.last_name}
                        </Link>
                    )
                },
            }),
            columnHelper.accessor('user.email', {
                header: 'Email',
                size: 250,
            }),
            columnHelper.accessor("role", {
                id: "role",
                header: () => (
                    <span className="ml-4">Role</span>
                ),
                cell: (info: any) => (
                    <RoleSelector
                        id={info.column.id}
                        value={info.getValue()}
                        onSetValue={(v) => handleRoleSelectorChange({
                            user_id: info.row.original.user.id,
                            role: v as Role,
                        })}
                    />
                ),
            }),
        ],
        []
    )

    const searchParams = useSearchParams()

    const filters = getSchoolUsersFilterFromSearchParam(searchParams)

    const { data, isLoading } = useSchoolUsersQuery(filters)

    const { mutate, isPending, error } = useUpdateSchoolUserRoleMutation(filters)

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const { rows } = table.getRowModel()

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => document.getElementById('table-scroll'),
        estimateSize: () => 45,
        overscan: 10,
    })

    const virtualRows = virtualizer.getVirtualItems()
    const totalSize = virtualizer.getTotalSize()
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
    const paddingBottom =
        virtualRows.length > 0
            ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
            : 0

    function handleRoleSelectorChange(v: UpdateSchoolUserRole) {
        mutate(v)
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    useEffect(() => {
        if (!error?.message) return
        toast.error(error.message)
    }, [error?.message])

    return (
        <div className="w-full flex flex-col">
            <div className="flex-1 overflow-hidden">
                <div
                    id="table-scroll"
                    className="h-full overflow-y-auto overflow-x-auto"
                >
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="border-b">
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            style={{
                                                width: header.getSize(),
                                            }}
                                            className="px-4 py-2 text-left font-semibold"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {paddingTop > 0 && (
                                <tr>
                                    <td style={{ height: `${paddingTop}px` }} />
                                </tr>
                            )}
                            {virtualRows.map((virtualRow) => {
                                const row = rows[virtualRow.index]
                                return (
                                    <tr
                                        key={row?.id}
                                    >
                                        {row?.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                style={{
                                                    width: cell.column.getSize(),
                                                }}
                                                className="px-4 py-3"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                            {paddingBottom > 0 && (
                                <tr>
                                    <td style={{ height: `${paddingBottom}px` }} />
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {rows.length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-500">
                    No school users found
                </div>
            )}
        </div>
    )
}