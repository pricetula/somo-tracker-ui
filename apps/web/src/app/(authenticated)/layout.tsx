import { headers } from "next/headers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect, RedirectType } from "next/navigation";
import { getQueryClient } from "@/lib/get-query-client";
import { meMeta } from "@/features/me/api/use-me";

export default async function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = await headers();

  const currentPath = header.get("x-current-path");

  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    queryKey: meMeta.queryKey,
    queryFn: meMeta.queryFn,
  });

  if (!result.success || !result.data) {
    redirect("/login", RedirectType.replace);
  }

  if (!result.data.school_id && currentPath !== "/onboarding") {
    redirect("/onboarding", RedirectType.replace);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
