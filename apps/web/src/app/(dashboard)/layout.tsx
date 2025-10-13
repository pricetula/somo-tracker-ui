import { redirect } from "next/navigation"
import { DehydratedState, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"
import { meQuery } from "@/features/me/queries/config";

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children, modal }: { modal: React.ReactNode, children: React.ReactNode }) {
    const queryClient = makeQueryClient();
    let dehydratedState: DehydratedState | undefined;

    try {
        // Prefetch user before painting on the browser
        const me = await queryClient.fetchQuery(meQuery);

        // If authorized user not found then sign out
        if (!me) {
            redirect("/signout")
        }
        console.log(me)
        // Makes the client cache to be serialized to be available on the client side
        dehydratedState = dehydrate(queryClient);
    } catch (error) {
        // Check if token refresh has failed and sign out
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