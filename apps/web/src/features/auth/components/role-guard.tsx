import { getQueryClient } from "@/lib/get-query-client";
import { meQueryKey } from "@/features/me/api/use-me";
import { getMe } from "@/features/me/api/actions";
import type { Role } from "@/features/auth/types";

export default async function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: Role[];
}) {
  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
  });

  const userRole = result.success ? result.data?.role : undefined;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <p className="text-lg font-semibold">Access Denied</p>
        <p className="text-sm text-muted-foreground">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
