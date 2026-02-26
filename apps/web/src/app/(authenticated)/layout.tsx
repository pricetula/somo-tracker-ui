import AuthGuard from "@/features/auth/components/auth-guard";
import { AppLayout } from "@/components/shared/app-layout/layout";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard checkIsOnboarded>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
