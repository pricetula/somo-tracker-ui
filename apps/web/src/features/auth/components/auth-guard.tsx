import { redirect, RedirectType } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { meQueryKey } from "@/features/me/api/use-me";
import { getMe } from "@/features/me/api/actions";

export default async function AuthGuard({
    children,
    checkIsOnboarded = false,
}: {
    children: React.ReactNode;
    checkIsOnboarded?: boolean;
}) {
    const queryClient = getQueryClient();

    const result = await queryClient.fetchQuery({
        queryKey: meQueryKey,
        queryFn: getMe,
    });

    if (!result.success || !result.data) {
        redirect("/logout", RedirectType.replace);
    }

    if (checkIsOnboarded) {
        if (!result.data.institute_id) {
            redirect("/onboarding/institute", RedirectType.replace);
        }
        if (!result.data.school_id) {
            redirect("/onboarding/school", RedirectType.replace);
        }
    }

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
