import AuthGuard from "@/features/auth/components/auth-guard";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard checkIsOnboarded>
      {children}
    </AuthGuard>
  );
}
