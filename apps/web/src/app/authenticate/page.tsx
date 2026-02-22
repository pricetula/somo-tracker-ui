import { redirect } from "next/navigation";
import { verifyMagicLinkToken } from "@/features/auth/api/actions";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function AuthenticatePage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/login");
  }

  const result = await verifyMagicLinkToken(token);

  if (!result.success) {
    redirect(`/login?error=${encodeURIComponent(result.error ?? "Invalid link.")}`);
  }

  redirect("/dashboard");
}
