"use client"

import * as React from "react"

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

const data = {
  navMain: [
    {
      title: "Users",
      url: "/users",
      icon: <UsersIcon />,
      items: [
        { title: "All Users", url: "/users" },
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
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SchoolSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
