import { redirect } from "next/navigation"
import { DehydratedState, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"
import { meQuery } from "@/features/me/queries/config";
import { isUUIDNil } from "@/shared/utils/is-uuid-nil";
import { SchoolUser } from "@/features/school-user/types";

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children, modal }: { modal: React.ReactNode, children: React.ReactNode }) {
    // Initialize query client
    const queryClient = makeQueryClient();

    // Prefetch data
    let dehydratedState: DehydratedState | undefined;

    // Variable to hold authorized user
    let me: SchoolUser | null = null

    try {
        // Prefetch user before painting on the browser
        me = await queryClient.fetchQuery(meQuery);
    } catch (error) {
        // Check if token refresh has failed and sign out
        if (error instanceof TokenRefreshFailedError) {
            redirect("/signout")
        }
    }

    // If authorized user not found then sign out
    if (!me || isUUIDNil(me.user_id)) {
        redirect("/onboarding")
    }

    // Makes the client cache to be serialized to be available on the client side
    dehydratedState = dehydrate(queryClient);

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