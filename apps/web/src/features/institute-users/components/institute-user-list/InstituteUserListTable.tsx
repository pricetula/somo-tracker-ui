"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import {
    Edit,
    Trash,
    ArrowDownCircle,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table"
import { RoleSelector } from "@/shared/components/role-selector"
import { InstituteUsers } from "../../types"
import { FilterButton } from "./FilterButton"

interface InstituteUserListTableProps {
    instituteUsers: InstituteUsers[]
}

export function InstituteUserListTable({ instituteUsers }: InstituteUserListTableProps) {
    const columns: ColumnDef<InstituteUsers>[] = React.useMemo(() => [
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
            cell: ({ getValue }) => {
                const role = (getValue()) as string
                return (
                    <RoleSelector
                        id="role"
                        value={role}
                        onSetValue={console.log}
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
    ], [])
    const [isNoMoreUsers, setIsNoMoreUsers] = React.useState(false)
    const [roles, setRoles] = React.useState<string[]>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [fetchedInstituteUsers, setFetchedInstituteUsers] = React.useState<InstituteUsers[]>(instituteUsers)
    const filteredInstituteUsers = React.useMemo(() => {
        if (roles.length === 0) return fetchedInstituteUsers
        return fetchedInstituteUsers.filter((instituteUser) => roles.includes(instituteUser.role))
    }, [roles, fetchedInstituteUsers])

    const table = useReactTable({
        columns,
        data: filteredInstituteUsers,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    async function getInstituteUsers() {
        const lastInstituteUser = filteredInstituteUsers[filteredInstituteUsers.length - 1]
        let uri = "/api/institute-users?limit=10"
        if (roles.length > 0) {
            uri += `&roles=${roles.join(",")}`
        }
        if (lastInstituteUser?.user?.created_at) {
            uri += `&last_seen_created_at=${new Date(lastInstituteUser.user.created_at).toISOString()}`
        }
        const resp = await fetch(uri)
        const data = await resp.json()
        if (!data?.length) {
            setIsNoMoreUsers(true)
            return
        }
        setFetchedInstituteUsers((prev) => [...prev, ...data])
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
                    onClick={getInstituteUsers}
                    disabled={isNoMoreUsers}
                >
                    <ArrowDownCircle />
                    <span>
                        Load more
                    </span>
                </Button>
            </div>
        </article>
    )
}
