"use client"

import { usePathname } from "next/navigation"
import {
    Building,
    Users,
    BookOpenCheck,
    ChartLine,
    ChevronRight,
} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar"
import React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible"

export function NavMain() {
    const pathname = usePathname()

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
            items: [
                {
                    title: "General",
                    url: "/users",
                },
                {
                    title: "Staff",
                    url: "/users/staff",
                },
                {
                    title: "Students",
                    url: "/users/students",
                },
                {
                    title: "Guardians",
                    url: "/users/guardians",
                },
            ],
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
                {items.map((item) => item.items && item.items?.length > 0
                    ? (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={pathname.includes(item.url)}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <a href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                    : (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <a href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
