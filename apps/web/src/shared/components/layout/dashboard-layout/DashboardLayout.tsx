import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { SiteHeader } from "./components/site-header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div className="px-5 pt-2 overflow-y-auto max-h-[92vh]">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}