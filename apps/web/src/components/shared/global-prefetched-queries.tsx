import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { educationSystemsQueryKey } from "@/features/education-system/api/use-education-systems";
import { getEducationSystems } from "@/features/education-system/api/actions";

export default async function GlobalPrefetchedQueries({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: educationSystemsQueryKey,
        queryFn: getEducationSystems,
    });

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
