"use client"

import { AppSidebar } from "@/components/shared/app-layout/app-sidebar"
import { DynamicBreadcrumbs } from "@/components/shared/dynamic-breadcrumbs"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ms-1" />
            <Separator
              orientation="vertical"
              className="me-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <DynamicBreadcrumbs />
          </div>
        </header>
        <div className="px-5.5">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
