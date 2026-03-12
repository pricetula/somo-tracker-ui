"use client";

import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQueryState } from "nuqs";
import { Loader2 } from "lucide-react";
import { useInfiniteSchoolUsers } from "@/features/school-users/api/use-school-users";
import { SchoolUserRow } from "./school-user-row";

const ROW_HEIGHT = 56;
const OVERSCAN = 10; // Slightly higher overscan helps with smoother scrolling on fast networks

interface SchoolUsersListProps {
    role: string;
}

export function SchoolUsersList({ role }: SchoolUsersListProps) {
    const [search] = useQueryState("search", { defaultValue: "" });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useInfiniteSchoolUsers({ search: search || undefined, role });

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

    // Fix for the Infinite Scroll Effect
    // We only want to trigger fetchNextPage when the index of the last visible item
    // hits the threshold of our current data length.
    useEffect(() => {
        const lastItem = virtualItems[virtualItems.length - 1];
        if (!lastItem) return;

        if (
            lastItem.index >= allItems.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [virtualItems, allItems.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex items-center justify-between px-4 py-2 border-b text-xs text-muted-foreground bg-muted/30">
                <span>{totalCount} users found</span>
                {(isFetching || isFetchingNextPage) && (
                    <Loader2 className="size-3 animate-spin text-primary" />
                )}
            </div>

            <div
                ref={parentRef}
                className="flex-1 overflow-auto scrollbar-hide"
                style={{ contain: 'strict' }} // Optimization for layout engine
            >
                <div
                    style={{ height: `${virtualizer.getTotalSize()}px` }}
                    className="relative w-full"
                >
                    {virtualItems.map((virtualRow) => {
                        const isLoaderRow = virtualRow.index >= allItems.length;
                        const user = allItems[virtualRow.index];

                        return (
                            <div
                                key={virtualRow.key}
                                data-index={virtualRow.index}
                                // We use the ref directly. To solve the stability warning,
                                // ensure the parent virtualizer options are stable.
                                ref={virtualizer.measureElement}
                                className="absolute top-0 left-0 w-full"
                                style={{
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {isLoaderRow ? (
                                    <div className="flex items-center justify-center h-14 border-b">
                                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <SchoolUserRow
                                        user={user}
                                        style={{ height: `${ROW_HEIGHT}px` }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}