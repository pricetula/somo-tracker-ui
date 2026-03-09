"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useMe } from "@/features/me/api/use-me"
import { useSchools } from "@/features/school/api/use-schools"
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react"
import { School } from "@/features/school/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function SchoolSwitcher() {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const { data: meData } = useMe()
  const { data: schoolsData } = useSchools()

  const schools = schoolsData?.success ? schoolsData.data : []
  const activeSchoolId = meData?.success ? meData.data?.school_id : undefined
  const activeSchool = schools?.find((s) => s.id === activeSchoolId) ?? schools?.[0]
  const initialSchoolName = activeSchool?.name?.[0]?.toUpperCase?.() ?? "U"

  const handleSchoolClicked = React.useCallback(
    (school: School) => console.log(school),
    []
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar>
                <AvatarFallback className="border-none bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">{initialSchoolName}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{activeSchool?.name || "Select a school"}</span>
              </div>
              <ChevronsUpDownIcon className="ms-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Schools
            </DropdownMenuLabel>
            {schools?.map((school, index) => (
              <DropdownMenuItem
                key={school.id}
                onClick={() => handleSchoolClicked(school)}
                className="gap-2 p-2"
              >
                {school.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/schools/new")}
              className="gap-2 p-2 cursor-pointer"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <PlusIcon className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add school</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
