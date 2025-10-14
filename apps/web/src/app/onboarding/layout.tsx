import { Nav } from "@/shared/components/layout/nav/Nav";
import { redirect } from "next/navigation"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"
import { meQuery } from "@/features/me/queries/config";
import { isUUIDNil } from "@/shared/utils/is-uuid-nil";
import { SchoolUser } from "@/features/school-user/types";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const queryClient = makeQueryClient();
    let me: SchoolUser | null = null

    try {
        // Prefetch user before painting on the browser
        me = await queryClient.fetchQuery(meQuery);
    } catch (error) {
        if (error instanceof TokenRefreshFailedError) {
            redirect("/signout")
        }
    }

    // If me object exists then redirect to landing page
    if (me && !isUUIDNil(me.user_id)) {
        redirect("/")
    }

    return (
        <main className="container mx-auto px-4 h-screen">
            <Nav />
            {children}
        </main>
    )
}