import { redirect } from "next/navigation";
import { verifyMagicLinkToken } from "@/features/auth/api/actions";
import { getQueryClient } from "@/lib/get-query-client";
import { meMeta } from "@/features/me/api/use-me";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function AuthenticatePage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/login");
  }

  const result = await verifyMagicLinkToken(token.trim());

  if (!result.success) {
    redirect(`/login?error=${encodeURIComponent(result.error ?? "Invalid link.")}`);
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: meMeta.queryKey,
    queryFn: meMeta.queryFn,
  });

  redirect("/institute");
}
