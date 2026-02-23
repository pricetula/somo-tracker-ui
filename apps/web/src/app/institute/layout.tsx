import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { meMeta } from "@/features/me/api/use-me";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();

  const currentPath = headerList.get("x-current-path");

  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    queryKey: meMeta.queryKey,
    queryFn: meMeta.queryFn,
  });

  if (!result.success || !result.data) {
    redirect("/login");
  }

  if (currentPath && !result.data.institute_id && currentPath !== "/institute/onboarding") {
    redirect("/institute/onboarding");
  }

  if (currentPath && !result.data.school_id && currentPath !== "/institute/school/onboarding") {
    redirect("/institute/school/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
