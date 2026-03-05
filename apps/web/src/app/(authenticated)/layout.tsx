import AuthGuard from "@/features/auth/components/auth-guard";
import { AppLayoutServer } from "@/components/shared/app-layout/app-layout-server";

export default async function AuthenticatedLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <AuthGuard checkIsOnboarded>
      <AppLayoutServer>
        {children}
        {modal}
      </AppLayoutServer>
    </AuthGuard>
  );
}
