import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { educationSystemsMeta } from "@/features/education-system/api/use-education-systems";
import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(educationSystemsMeta);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnboardingForm />
    </HydrationBoundary>
  );
}
