import GlobalPrefetchedQueries from "@/components/shared/global-prefetched-queries";
import AuthGuard from "@/features/auth/components/auth-guard";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <GlobalPrefetchedQueries>{children}</GlobalPrefetchedQueries>
        </AuthGuard>
    );
}
