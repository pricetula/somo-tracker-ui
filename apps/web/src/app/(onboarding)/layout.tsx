import { Nav } from "@/shared/components/layout/nav/Nav";
import { redirect } from "next/navigation"
import { getMe } from "@/features/me/services/get-me"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"
import { isUUIDNil } from "@/shared/utils/is-uuid-nil"

export default async function Layout({ children }: { children: React.ReactNode }) {
    try {
        const queryClient = makeQueryClient();

        // Prefetch user
        const me = await queryClient.fetchQuery({
            queryKey: ['me'],
            queryFn: getMe,
        });

        if (me?.user_id) {
            redirect("/")
        }
    } catch (error) {
        if (error instanceof TokenRefreshFailedError) {
            redirect("/signout")
        }
    }

    return (
        <main className="container mx-auto px-4 h-screen">
            <Nav />
            {children}
        </main>
    )
}