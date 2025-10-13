import { Nav } from "@/shared/components/layout/nav/Nav";
import { redirect } from "next/navigation"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"
import { meQuery } from "@/features/me/queries/config";

export default async function Layout({ children }: { children: React.ReactNode }) {
    try {
        const queryClient = makeQueryClient();

        // Prefetch user before painting on the browser
        const me = await queryClient.fetchQuery(meQuery);

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