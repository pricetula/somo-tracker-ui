import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { SiteHeader } from "./components/site-header"

export function Layout({ children }: { children: React.ReactNode }) {
    return (

        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}