"use client"

import React from "react"
import Link from "next/link"
import {
    Building,
    Users,
    BookOpenCheck,
    ChartLine,
} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

export function NavMain() {
    const items = [
        {
            title: "Dashboard",
            url: "/",
            icon: Building,
        },
        {
            title: "Users",
            icon: Users,
            url: "/users",
        },
        {
            title: "Exams",
            url: "/exams",
            icon: BookOpenCheck,
        },
        {
            title: "Analytics",
            url: "/analytics",
            icon: ChartLine,
        },
    ]
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Institute</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton tooltip={item.title} asChild>
                            <Link href={item.url}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
