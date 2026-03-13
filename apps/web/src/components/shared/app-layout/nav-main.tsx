"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, Settings2Icon, UsersIcon } from "lucide-react";

const navItems = [
    {
        title: "Users",
        url: "/students",
        icon: <UsersIcon />,
        items: [
            { title: "Students", url: "/students" },
            { title: "Guardians", url: "/guardians" },
            { title: "Faculty", url: "/faculty" },
            { title: "Admins", url: "/admins" },
        ],
    },
    {
        title: "Settings",
        url: "/settings",
        icon: <Settings2Icon />,
        items: [{ title: "System Settings", url: "/settings" }],
    },
];

function NavMainItem({
    item,
    isDefaultOpen,
}: {
    item: {
        title: string;
        url: string;
        icon?: React.ReactNode;
        isActive?: boolean;
        items?: { title: string; url: string }[];
    };
    isDefaultOpen: boolean;
}) {
    return (
        <Collapsible asChild defaultOpen={isDefaultOpen} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {item.icon}
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={true}>
                                    <Link href={subItem.url}>
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

export function NavMain() {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {navItems.map((navItem) => {
                    const isDefaultOpen =
                        navItem?.items?.length > 0 &&
                        navItem.items.some((subItem) => pathname.startsWith(subItem.url));
                    return (
                        <NavMainItem
                            key={navItem.title}
                            item={navItem}
                            isDefaultOpen={isDefaultOpen}
                        />
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
