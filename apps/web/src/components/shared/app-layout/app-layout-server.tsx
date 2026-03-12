import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { schoolsQueryKey } from "@/features/school/api/use-schools";
import { getSchoolsByInstitute } from "@/features/school/api/actions";
import { AppLayout } from "@/components/shared/app-layout/layout";

export async function AppLayoutServer({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: schoolsQueryKey,
        queryFn: getSchoolsByInstitute,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AppLayout>{children}</AppLayout>
        </HydrationBoundary>
    );
}
