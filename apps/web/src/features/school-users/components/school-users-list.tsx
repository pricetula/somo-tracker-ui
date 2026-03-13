"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQueryState } from "nuqs";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useInfiniteSchoolUsers } from "@/features/school-users/api/use-school-users";
import { useDeleteSchoolUsers } from "@/features/school-users/api/use-school-users-mutations";
import { SchoolUserRow } from "./school-user-row";

const ROW_HEIGHT = 56;
const OVERSCAN = 10;

interface SchoolUsersListProps {
    role: string;
}

export function SchoolUsersList({ role }: SchoolUsersListProps) {
    const [search] = useQueryState("search", { defaultValue: "" });
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useInfiniteSchoolUsers({ search: search || undefined, role });

    const allItems = data?.pages.flatMap((p) => (p.success ? (p.data?.items ?? []) : [])) ?? [];

    const totalCount = (data?.pages[0]?.success ? data.pages[0].data?.total_count : undefined) ?? 0;

    const { mutate: deleteUsers, isPending: isDeleting } = useDeleteSchoolUsers();

    const parentRef = useRef<HTMLDivElement>(null);

    const getScrollElement = useCallback(() => parentRef.current, []);
    const estimateSize = useCallback(() => ROW_HEIGHT, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const virtualizer = useVirtualizer({
        count: hasNextPage ? allItems.length + 1 : allItems.length,
        getScrollElement,
        estimateSize,
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

    // Clear selection when search/role changes
    useEffect(() => {
        setSelectedIds(new Set());
    }, [search, role]);

    const handleToggleSelect = useCallback((userId: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(userId)) {
                next.delete(userId);
            } else {
                next.add(userId);
            }
            return next;
        });
    }, []);

    const handleToggleAll = useCallback(() => {
        if (selectedIds.size === allItems.length && allItems.length > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(allItems.map((u) => u.user_id || "").filter(Boolean)));
        }
    }, [selectedIds.size, allItems]);

    const handleDeleteSelected = useCallback(() => {
        const ids = Array.from(selectedIds);
        deleteUsers(
            { ids },
            {
                onSuccess: () => {
                    setSelectedIds(new Set());
                    toast.success(`${ids.length} user${ids.length > 1 ? "s" : ""} deleted.`);
                },
                onError: () => {
                    toast.error("Failed to delete users.");
                },
            }
        );
    }, [selectedIds, deleteUsers]);

    const handleDeleteSingle = useCallback(
        (userId: string) => {
            deleteUsers(
                { ids: [userId] },
                {
                    onSuccess: () => {
                        setSelectedIds((prev) => {
                            const next = new Set(prev);
                            next.delete(userId);
                            return next;
                        });
                        toast.success("User deleted.");
                    },
                    onError: () => {
                        toast.error("Failed to delete user.");
                    },
                }
            );
        },
        [deleteUsers]
    );

    const allSelected = allItems.length > 0 && selectedIds.size === allItems.length;
    const someSelected = selectedIds.size > 0 && !allSelected;

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] overflow-y-auto bg-background">
            <div className="flex items-center justify-between px-4 py-2 border-b text-xs text-muted-foreground bg-muted/30">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => {
                            if (el) el.indeterminate = someSelected;
                        }}
                        onChange={handleToggleAll}
                        className="size-4 rounded border-border accent-primary cursor-pointer"
                        aria-label="Select all"
                    />
                    <span>{totalCount} users found</span>
                </div>
                <div className="flex items-center gap-2">
                    {selectedIds.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            disabled={isDeleting}
                            className="flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                        >
                            {isDeleting ? (
                                <Loader2 className="size-3 animate-spin" />
                            ) : (
                                <Trash2 className="size-3" />
                            )}
                            Delete {selectedIds.size} selected
                        </button>
                    )}
                    {(isFetching || isFetchingNextPage) && (
                        <Loader2 className="size-3 animate-spin text-primary" />
                    )}
                </div>
            </div>

            <div ref={parentRef} className="flex-1 overflow-auto scrollbar-hide min-h-0">
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
                                        selected={selectedIds.has(user.user_id || "")}
                                        onToggleSelect={handleToggleSelect}
                                        onDelete={handleDeleteSingle}
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
