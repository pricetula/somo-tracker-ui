import { handleGetMe } from "@/features/me/handle-get-me"
import { MeHydrator } from "@/features/me/store-hydrator"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const me = await handleGetMe()
    return (
        <main>
            {children}
            <MeHydrator me={me} />
        </main>
    )
}