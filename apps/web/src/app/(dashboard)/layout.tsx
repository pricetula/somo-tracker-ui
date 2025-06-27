import { handleGetMe } from "@/features/me/handle-get-me"

export default async function Layout({ children }: { children: React.ReactNode }) {
    await handleGetMe()
    return (
        <main>
            {children}
        </main>
    )
}