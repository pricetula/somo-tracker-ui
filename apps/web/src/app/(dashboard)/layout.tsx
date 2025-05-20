import { Layout as AppLayout } from "@/components/common/layout"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}