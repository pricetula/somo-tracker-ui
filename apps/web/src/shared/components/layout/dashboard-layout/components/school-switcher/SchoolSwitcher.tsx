"use client"

import { Suspense } from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/shared/components/ui/sidebar"
import { useSchoolsStore } from "@/features/school/store"
import { useMeStore } from "@/features/me/store"
import { School } from "@/features/school/types"

export function SchoolSwitcher() {
    const { isMobile } = useSidebar()
    const me = useMeStore((s) => s.me)
    const schools = useSchoolsStore((s) => s.schools)

    if (!schools.length) {
        return null
    }

    const activeSchool = schools.find((school) => school.id === me?.active_school_id)

    if (!activeSchool) {
        return null
    }

    function setActiveSchool(s: School) {
        console.log("schoool", s)
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Suspense>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    {activeSchool.name[0]?.toUpperCase?.()}
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {activeSchool.name}
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </Suspense>
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
                        {schools.map((school, index) => (
                            <DropdownMenuItem
                                key={school.name}
                                onClick={() => setActiveSchool(school)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    {school.name[0]?.toUpperCase?.()}
                                </div>
                                {school.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
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
