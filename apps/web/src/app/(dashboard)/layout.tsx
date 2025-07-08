import { handleGetMe } from "@/features/me/handle-get-me"
import { MeHydrator } from "@/features/me/store-hydrator"
import { handleGetSchools } from "@/features/school/handle-get-school"

export default async function Layout({ children }: { children: React.ReactNode }) {
    // const me = await handleGetMe()
    // const schools = await handleGetSchools()
    return (
        <main>
            {children}
            {/* <MeHydrator me={me} /> */}
        </main>
    )
}