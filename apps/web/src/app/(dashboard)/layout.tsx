import { Layout as AppLayout } from "@/components/common/layout"
import { getAccessToken } from "@/lib/auth"
import { getMe } from "@/lib/service/user"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const token = await getAccessToken()
    const me = await getMe(token)
    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}