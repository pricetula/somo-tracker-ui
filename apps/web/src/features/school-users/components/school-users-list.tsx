"use client";

import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQueryState } from "nuqs";
import { Loader2 } from "lucide-react";
import { useInfiniteSchoolUsers } from "@/features/school-users/api/use-school-users";
import { SchoolUserRow } from "./school-user-row";

const ROW_HEIGHT = 56;
const OVERSCAN = 5;

export function SchoolUsersList() {
  const [search] = useQueryState("search", { defaultValue: "" });
  const [role] = useQueryState("role", { defaultValue: "" });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteSchoolUsers({ search: search || undefined, role: role || undefined });

  const allItems = data?.pages.flatMap((p) => (p.success ? (p.data?.items ?? []) : [])) ?? [];
  const totalCount = (data?.pages[0]?.success ? data.pages[0].data?.total_count : undefined) ?? 0;

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;
    if (lastItem.index >= allItems.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualItems, allItems.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b text-xs text-muted-foreground">
        <span>{totalCount} users</span>
        {isFetching && !isFetchingNextPage && (
          <Loader2 className="size-3 animate-spin" />
        )}
      </div>

      <div ref={parentRef} className="flex-1 overflow-auto">
        <div
          style={{ height: virtualizer.getTotalSize() }}
          className="relative w-full"
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index >= allItems.length;
            const user = allItems[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <div className="flex items-center justify-center h-14">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <SchoolUserRow user={user} style={{ height: ROW_HEIGHT }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
