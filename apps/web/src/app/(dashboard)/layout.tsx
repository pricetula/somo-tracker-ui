import { redirect } from "next/navigation"
import { getMe } from "@/features/me/services/get-me"
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"
import { isUUIDNil } from "@/shared/utils/is-uuid-nil"

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children, modal }: { modal: React.ReactNode, children: React.ReactNode }) {
    try {
        const queryClient = makeQueryClient();

        // Prefetch user
        const me = await queryClient.fetchQuery({
            queryKey: ['me'],
            queryFn: getMe,
        });

        if (!me || isUUIDNil(me.user_id)) {
            redirect("/signout")
        }
    } catch (error) {
        if (error instanceof TokenRefreshFailedError) {
            redirect("/signout")
        }
    }

    return (
        <DashboardLayout>
            <main className="h-[90vh] overflow-y-auto">
                {children}
                {modal}
            </main>
        </DashboardLayout>
    )
}