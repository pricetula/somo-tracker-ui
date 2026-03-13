import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getStudentProfile } from "@/features/school-users/api/actions";
import { studentProfileQueryKey } from "@/features/school-users/api/use-school-user-profile";
import { StudentProfileDetail } from "@/features/school-users/components/student-profile-detail";

export default async function StudentDetailPage({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) {
    const { studentId } = await params;
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: studentProfileQueryKey(studentId),
        queryFn: () => getStudentProfile(studentId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StudentProfileDetail userId={studentId} />
        </HydrationBoundary>
    );
}
