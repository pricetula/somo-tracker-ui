import { redirect } from "next/navigation";
import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { meMeta } from "@/features/me/api/use-me";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    queryKey: meMeta.queryKey,
    queryFn: meMeta.queryFn,
  });

  if (!result.success || !result.data) {
    redirect("/login");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
