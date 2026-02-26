import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { meMeta } from "@/features/me/api/use-me";

export default async function AuthGuard({
    children,
    isOnboarded = false,
}: {
    children: React.ReactNode;
    isOnboarded?: boolean;
}) {
    const queryClient = getQueryClient();

    const result = await queryClient.fetchQuery({
        queryKey: meMeta.queryKey,
        queryFn: meMeta.queryFn,
    });

    if (!result.success || !result.data) {
        redirect("/logout", RedirectType.replace);
    }

    const pathname = (await headers()).get("x-current-path") ?? "";

    if (isOnboarded) {
        if (!result.data.school_id && pathname !== "/onboarding") {
            redirect("/onboarding", RedirectType.replace);
        }
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
