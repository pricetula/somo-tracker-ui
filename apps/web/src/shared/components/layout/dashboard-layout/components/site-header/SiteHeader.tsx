import React from "react"

import { headers } from "next/headers"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb"
import { Separator } from "@/shared/components/ui/separator"
import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import { parseBreadcrumbs } from "./utils"

export async function SiteHeader() {
    // get headers from request
    const headersList = await headers();

    // get the "x-pathname" field on request headers
    const pathname = headersList.get("x-pathname") || "/"

    // generate breadcrumb list of links
    const breadCrumbs = parseBreadcrumbs(pathname)

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12  border-b w-full">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {
                            breadCrumbs
                                .map((breadcrumb) => (
                                    <React.Fragment key={breadcrumb.id}>
                                        <BreadcrumbItem>
                                            {
                                                breadcrumb.isLast
                                                    ? (
                                                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                                    )
                                                    : (
                                                        <BreadcrumbLink href={breadcrumb.href}>
                                                            {breadcrumb.label}
                                                        </BreadcrumbLink>
                                                    )
                                            }
                                        </BreadcrumbItem>
                                        {
                                            breadcrumb.isLast
                                                ? null
                                                : <BreadcrumbSeparator className="hidden md:block" />
                                        }
                                    </React.Fragment>
                                ))
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
