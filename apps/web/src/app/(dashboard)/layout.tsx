import { Layout as AppLayout } from "@/components/common/layout"
import { getAccessToken } from "@/lib/auth"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const token = await getAccessToken()
    console.log("---------------------------------------->>>>", token)
    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}