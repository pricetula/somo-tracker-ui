import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { educationSystemsMeta } from "@/features/education-system/api/use-education-systems";


export default async function GlobalPrefetchedQueries(
    {
        children,
    }: {
        children: React.ReactNode;
    }
) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(educationSystemsMeta);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
