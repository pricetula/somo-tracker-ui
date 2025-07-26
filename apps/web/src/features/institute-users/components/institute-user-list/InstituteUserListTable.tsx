"use client"

import * as React from "react"
import { toast } from "sonner"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    ArrowDownCircle,
    Loader2Icon,
} from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table"
import { BulkActions } from "@/shared/components/bulk-actions"
import { GetInstituteUsersParams, GetInstituteUsersResponse, InstituteUsers } from "../../types"
import { FilterButton } from "./FilterButton"
import { ConfirmMemberRoleChange } from "./ConfirmMemberRoleChange"
import { useInstituteUsersColumns } from "./hooks"

interface InstituteUserListTableProps {
    instituteUsers: InstituteUsers[]
    getInstituteUsers(i: GetInstituteUsersParams): Promise<GetInstituteUsersResponse>
}

export function InstituteUserListTable({ instituteUsers, getInstituteUsers }: InstituteUserListTableProps) {
    const columns = useInstituteUsersColumns(handleRequestUpdateInstituteUserRole)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isNoMoreUsers, setIsNoMoreUsers] = React.useState(false)
    const [roles, setRoles] = React.useState<string[]>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [fetchedInstituteUsers, setFetchedInstituteUsers] = React.useState<InstituteUsers[]>(instituteUsers)
    const filteredInstituteUsers = React.useMemo(() => {
        if (roles.length === 0) return fetchedInstituteUsers
        return fetchedInstituteUsers.filter((instituteUser) => roles.includes(instituteUser.role))
    }, [roles, fetchedInstituteUsers])

    const table = useReactTable({
        columns: columns(),
        data: filteredInstituteUsers,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    async function handleGetInstituteUsers() {
        const lastInstituteUser = filteredInstituteUsers[filteredInstituteUsers.length - 1]
        let lastSeenCreatedAt = ""
        if (lastInstituteUser?.user?.created_at) {
            lastSeenCreatedAt = new Date(lastInstituteUser.user.created_at).toISOString()
        }
        setIsSubmitting(true)
        const { data, error } = await getInstituteUsers({
            roles: roles.join(","),
            limit: 10,
            lastSeenCreatedAt,
        })
        setIsSubmitting(false)
        if (error) {
            toast.error(error)
            return
        }
        if (!data?.length) {
            setIsNoMoreUsers(true)
            return
        }
        setFetchedInstituteUsers((prev) => [...prev, ...data])
    }

    function handleRequestUpdateInstituteUserRole(instituteUsers: InstituteUsers) {
        console.log(instituteUsers)
    }

    return (
        <article className="w-full">
            <nav className="flex items-center justify-between mb-1">
                <FilterButton onCheckedRoles={setRoles} />
            </nav>
            <section className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={(header.column.columnDef.meta as any)?.className}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="py-1" key={cell.id} width={cell.id && cell.id.includes("actions") ? 60 : "auto"}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section>
            <div className="flex items-center justify-center pt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGetInstituteUsers}
                    disabled={isNoMoreUsers}
                >
                    {
                        isSubmitting
                            ? (
                                <>
                                    <Loader2Icon className="animate-spin" />
                                    <span>
                                        Loading ...
                                    </span>
                                </>
                            )
                            : (
                                <>
                                    <ArrowDownCircle />
                                    <span>
                                        Load more
                                    </span>
                                </>
                            )
                    }
                </Button>
            </div>
            <BulkActions
                open={!!Object.keys(rowSelection).length}
            >sss</BulkActions>
            <ConfirmMemberRoleChange />
        </article>
    )
}
