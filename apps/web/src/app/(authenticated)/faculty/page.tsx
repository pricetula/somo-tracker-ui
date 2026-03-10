import Link from "next/link";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getSchoolUsers } from "@/features/school-users/api/actions";
import { schoolUsersQueryKey, SCHOOL_USERS_PAGE_SIZE } from "@/features/school-users/api/use-school-users";
import { SchoolUsersFilters } from "@/features/school-users/components/school-users-filters";
import { SchoolUsersList } from "@/features/school-users/components/school-users-list";
import { Button } from "@/components/ui/button";
import RoleGuard from "@/features/auth/components/role-guard";

export default async function FacultyPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const filters = { search: search || undefined, role: "FACULTY" };

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: schoolUsersQueryKey(filters),
    queryFn: ({ pageParam }) =>
      getSchoolUsers({ ...filters, limit: SCHOOL_USERS_PAGE_SIZE, offset: pageParam as number }),
    initialPageParam: 0,
  });

  return (
    <RoleGuard allowedRoles={["ADMIN", "FACULTY"]}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col h-full gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Faculty</h1>
            <Button asChild>
              <Link href="/faculty/add">Add faculty</Link>
            </Button>
          </div>
          <SchoolUsersFilters />
          <div className="flex-1 rounded-lg border overflow-hidden">
            <SchoolUsersList />
          </div>
        </div>
      </HydrationBoundary>
    </RoleGuard>
  );
}
