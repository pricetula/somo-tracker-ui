"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/shared/app-layout/nav-main"
import { NavUser } from "@/components/shared/app-layout/nav-user"
import { SchoolSwitcher } from "@/components/shared/app-layout/school-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UsersIcon, Settings2Icon } from "lucide-react"

const navItems = [
  {
    title: "Users",
    url: "/students",
    icon: <UsersIcon />,
    items: [
      { title: "Students", url: "/students" },
      { title: "Guardians", url: "/guardians" },
      { title: "Faculty", url: "/faculty" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings2Icon />,
    items: [
      { title: "System Settings", url: "/settings" },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const items = navItems.map((item) => ({
    ...item,
    isActive: item.items.some((sub) => pathname.startsWith(sub.url)),
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SchoolSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
