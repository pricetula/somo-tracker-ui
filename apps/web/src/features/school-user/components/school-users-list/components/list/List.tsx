"use client"

import React, { useEffect, useMemo } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useVirtualizer } from "@tanstack/react-virtual"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useRouter, useSearchParams } from "next/navigation"
import { RoleSelector } from "@/shared/components/role-selector"
import { Role } from "@/features/user/types"
import { useSchoolUsersQuery } from "@/features/school-user/hooks/useSchoolUsersQuery"
import { SchoolUser, SearchParamsState, UpdateSchoolUserRole } from "@/features/school-user/types"
import { useUpdateSchoolUserRoleMutation } from "@/features/school-user/hooks/update-school-user-role-mutation"
import { Header } from "./components/header"
import { buildSchoolUsersURL, getSchoolUsersFilterFromSearchParam } from "@/features/school-user/utils"

const columnHelper = createColumnHelper<SchoolUser>()

export function List() {
    const router = useRouter()

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
                    <div className="flex justify-end pr-10">
                        <span>Role</span>
                    </div>
                ),
                cell: (info: any) => (
                    <div className="flex justify-end">
                        <RoleSelector
                            id={info.column.id}
                            value={info.getValue()}
                            onSetValue={(v) => handleRoleSelectorChange({
                                school_id: info.row.original.school_id,
                                user_id: info.row.original.user_id,
                                role: v as Role,
                            })}
                        />
                    </div>
                ),
            }),
        ],
        []
    )

    const searchParams = useSearchParams()

    const filters = getSchoolUsersFilterFromSearchParam(searchParams)

    const { mutate, isPending, error } = useUpdateSchoolUserRoleMutation(filters)

    const { data, isLoading } = useSchoolUsersQuery(filters)

    // Memoize the data to prevent unnecessary table recreations
    const tableData = useMemo(() => data ?? [], [data])

    const table = useReactTable({
        data: tableData,
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

    function onSearchParamsChange(s: SearchParamsState) {
        if (!process.env.NEXT_PUBLIC_WEB_URL) return
        router.push(buildSchoolUsersURL(`${process.env.NEXT_PUBLIC_WEB_URL}/users`, { ...s, lastSeenCreatedAt: null }))
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
        <div className="w-full flex flex-col pt-2">
            <Header />
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
                                        className="hover:bg-accent"
                                    >
                                        {row?.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                style={{
                                                    width: cell.column.getSize(),
                                                }}
                                                className="px-4 py-2"
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