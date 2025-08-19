"use client"

import { useEffect, useState } from "react"
import { ChevronsUpDown, Plus, Check } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
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
import { Skeleton } from "@/shared/components/ui/skeleton"
import { useSchoolsStore } from "@/features/school/store"
import { useMeStore } from "@/features/me/store"
import { School } from "@/features/school/types"
import { setActiveSchool } from "@/features/me/services/set-active-school"

export function SchoolSwitcher() {
    const [activeSchoolState, setActiveSchoolState] = useState<School>()
    const { isMobile } = useSidebar()
    const me = useMeStore((s) => s.me)
    const schools = useSchoolsStore((s) => s.schools)

    useEffect(() => {
        if (me?.active_school_id && schools.length > 0) {
            setActiveSchoolState(schools.find((school) => school.id === me?.active_school_id))
        }
    }, [schools, me?.active_school_id])

    if (!schools.length || !activeSchoolState) {
        return <Skeleton className="h-[42px] w-[208px]" />
    }

    async function handleSetActiveSchool(s: School) {
        if (!s.id) return
        setActiveSchoolState(s)
        const { error } = await setActiveSchool(s.id)
        if (error) {
            toast.error(error);
            return
        }
        window.location.reload()
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {activeSchoolState.name[0]?.toUpperCase?.()}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeSchoolState.name}
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
                        {schools.map((school, index) => (
                            <DropdownMenuItem
                                key={school.name}
                                onClick={() => handleSetActiveSchool(school)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    {school.name[0]?.toUpperCase?.()}
                                </div>
                                {school.name}
                                {
                                    activeSchoolState && activeSchoolState.id === school.id && (
                                        <Check className="ml-auto text-green-400" />
                                    )
                                }
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
