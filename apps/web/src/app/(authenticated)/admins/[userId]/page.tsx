import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getAdminProfile } from "@/features/school-users/api/actions";
import { adminProfileQueryKey } from "@/features/school-users/api/use-school-user-profile";
import { AdminProfileDetail } from "@/features/school-users/components/admin-profile-detail";

export default async function AdminDetailPage({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: adminProfileQueryKey(userId),
        queryFn: () => getAdminProfile(userId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AdminProfileDetail userId={userId} />
        </HydrationBoundary>
    );
}
