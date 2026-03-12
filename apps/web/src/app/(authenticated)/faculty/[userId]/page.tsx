import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getFacultyProfile } from "@/features/school-users/api/actions";
import { facultyProfileQueryKey } from "@/features/school-users/api/use-school-user-profile";
import { FacultyProfileDetail } from "@/features/school-users/components/faculty-profile-detail";

export default async function FacultyDetailPage({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: facultyProfileQueryKey(userId),
        queryFn: () => getFacultyProfile(userId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FacultyProfileDetail userId={userId} />
        </HydrationBoundary>
    );
}
