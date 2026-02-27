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

  // make sure this is not used in /onboarding route
  if (checkIsOnboarded && !result.data.school_id) {
    redirect("/onboarding", RedirectType.replace);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
