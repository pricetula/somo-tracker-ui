"use client";

import { useQuery } from "@tanstack/react-query";
import { getMeAction } from "@/features/me/api/actions";

export const ME_QUERY_KEY = ["me"] as const;

export function useMe() {
    return useQuery({
        queryKey: ME_QUERY_KEY,
        queryFn: () => getMeAction(),
        staleTime: 5 * 60 * 1000,
    });
}
