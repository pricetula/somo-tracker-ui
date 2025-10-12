"use client"

import { ChevronsUpDown, Plus, Check } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/shared/components/ui/sidebar"
import { useMeQuery } from "@/features/me/hooks/useMeQuery"
import { School } from "@/features/school/types"
import { useSchoolsQuery } from "@/features/school/hooks/use-schools-query"

export function SchoolSwitcher() {
    const { isMobile } = useSidebar()
    const { data: schools, isRefetching, refetch } = useSchoolsQuery()
    const { data: schoolUser, isPending } = useMeQuery()

    // Show loading element
    if (isPending) {
        return <div className="w-full h-10 animate-pulse rounded-md bg-muted" />
    }

    // If null just return null
    if (!schoolUser) {
        return null
    }

    const activeSchool = schoolUser?.school

    function handleSetActiveSchool(s: School) {
        console.log(s)
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            onClick={() => refetch()}
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {activeSchool?.name[0]?.toUpperCase?.()}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeSchool?.name}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Schools
                        </DropdownMenuLabel>
                        {
                            isRefetching && (
                                <DropdownMenuItem>
                                    <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24" />
                                    <span>Loading ...</span>
                                </DropdownMenuItem>
                            ) ||
                            // schools && schools.map((school) => (
                            //     <DropdownMenuItem
                            //         key={school.name}
                            //         onClick={() => handleSetActiveSchool(school)}
                            //         className="gap-2 p-2"
                            //     >
                            //         <div className="flex size-6 items-center justify-center rounded-sm border">
                            //             {school.name[0]?.toUpperCase?.()}
                            //         </div>
                            //         {school.name}
                            //         {
                            //             activeSchool && activeSchool.id === school.id && (
                            //                 <Check className="ml-auto text-green-400" />
                            //             )
                            //         }
                            //     </DropdownMenuItem>
                            // )) ||
                            (!schools || schools.length === 0) && (
                                <DropdownMenuItem>
                                    No schools found
                                </DropdownMenuItem>
                            )

                        }
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/school/create" className="flex gap-2">
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus className="size-4" />
                                </div>
                                <div className="font-medium text-muted-foreground">Add school</div>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
