import AuthGuard from "@/features/auth/components/auth-guard";
import { AppLayoutServer } from "@/components/shared/app-layout/app-layout-server";
import GlobalPrefetchedQueries from "@/components/shared/global-prefetched-queries";

export default async function AuthenticatedLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <AuthGuard checkIsOnboarded>
            <GlobalPrefetchedQueries>
                <AppLayoutServer>
                    {children}
                    {modal}
                </AppLayoutServer>
            </GlobalPrefetchedQueries>
        </AuthGuard>
    );
}
