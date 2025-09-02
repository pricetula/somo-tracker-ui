"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/shared/components/ui/sidebar"
import { SchoolSwitcher } from "../school-switcher/SchoolSwitcher"
import { NavMain } from "../nav-main"
import { NavPlatform } from "../nav-platform"
import { NavUser } from "../nav-user"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SchoolSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
                <NavPlatform />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
