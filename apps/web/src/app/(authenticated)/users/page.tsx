import Link from "next/link";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getSchoolUsers } from "@/features/school-users/api/actions";
import { schoolUsersQueryKey, SCHOOL_USERS_PAGE_SIZE } from "@/features/school-users/api/use-school-users";
import { SchoolUsersFilters } from "@/features/school-users/components/school-users-filters";
import { SchoolUsersList } from "@/features/school-users/components/school-users-list";
import { Button } from "@/components/ui/button";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; role?: string }>;
}) {
  const { search, role } = await searchParams;
  const filters = { search: search || undefined, role: role || undefined };

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: schoolUsersQueryKey(filters),
    queryFn: ({ pageParam }) =>
      getSchoolUsers({ ...filters, limit: SCHOOL_USERS_PAGE_SIZE, offset: pageParam as number }),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Users</h1>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/users/add-students">Add students</Link>
            </Button>
            <Button asChild>
              <Link href="/users/invite">Invite user</Link>
            </Button>
          </div>
        </div>
        <SchoolUsersFilters />
        <div className="flex-1 rounded-lg border overflow-hidden">
          <SchoolUsersList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
