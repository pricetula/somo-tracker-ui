import { redirect } from "next/navigation"
import { DehydratedState, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getMe } from "@/features/me/services/get-me"
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children, modal }: { modal: React.ReactNode, children: React.ReactNode }) {
    const queryClient = makeQueryClient();
    let dehydratedState: DehydratedState | undefined;

    try {
        // Prefetch user
        const me = await queryClient.fetchQuery({
            queryKey: ['me'],
            queryFn: getMe,
        });

        if (!me) {
            redirect("/signout")
        }

        dehydratedState = dehydrate(queryClient);
    } catch (error) {
        if (error instanceof TokenRefreshFailedError) {
            redirect("/signout")
        }
    }

    return (
        <HydrationBoundary state={dehydratedState}>
            <DashboardLayout>
                <main className="h-[90vh] overflow-y-auto">
                    {children}
                    {modal}
                </main>
            </DashboardLayout>
        </HydrationBoundary>
    )
}