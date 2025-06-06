import { Layout as AppLayout } from "@/components/common/layout"

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}