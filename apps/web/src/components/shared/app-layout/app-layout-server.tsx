import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/get-query-client"
import { schoolsMeta } from "@/features/school/api/use-schools"
import { AppLayout } from "@/components/shared/app-layout/layout"

export async function AppLayoutServer({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(schoolsMeta)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppLayout>{children}</AppLayout>
    </HydrationBoundary>
  )
}
