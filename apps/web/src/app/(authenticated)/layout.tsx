import AuthGuard from "@/features/auth/components/auth-guard";
import { AppLayoutServer } from "@/components/shared/app-layout/app-layout-server";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard checkIsOnboarded>
      <AppLayoutServer>{children}</AppLayoutServer>
    </AuthGuard>
  );
}
