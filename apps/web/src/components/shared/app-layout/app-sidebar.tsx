"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/shared/app-layout/nav-main";
import { NavUser } from "@/components/shared/app-layout/nav-user";
import { SchoolSwitcher } from "@/components/shared/app-layout/school-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { UsersIcon, Settings2Icon } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SchoolSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
