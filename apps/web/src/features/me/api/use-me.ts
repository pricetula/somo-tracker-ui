import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "./fetch-me";

export const meQueryKey = ["me"] as const;

export function useMe() {
    return useQuery({
        queryKey: meQueryKey,
        queryFn: fetchMe,
        staleTime: 1000 * 60 * 5,
    });
}
