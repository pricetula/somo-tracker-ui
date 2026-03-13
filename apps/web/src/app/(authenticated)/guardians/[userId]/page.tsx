import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getGuardianProfile } from "@/features/school-users/api/actions";
import { guardianProfileQueryKey } from "@/features/school-users/api/use-school-user-profile";
import { GuardianProfileDetail } from "@/features/school-users/components/guardian-profile-detail";

export default async function GuardianDetailPage({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: guardianProfileQueryKey(userId),
        queryFn: () => getGuardianProfile(userId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <GuardianProfileDetail userId={userId} />
        </HydrationBoundary>
    );
}
