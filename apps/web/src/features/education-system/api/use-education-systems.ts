import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { fetchEducationSystems, fetchEducationSystem } from "./fetch-education-systems";

export const educationSystemsQueryKey = ["education-systems"] as const;

export function useEducationSystems() {
    return useSuspenseQuery({
        queryKey: educationSystemsQueryKey,
        queryFn: fetchEducationSystems,
        staleTime: Infinity,
    });
}

export function educationSystemQueryKey(id: string) {
    return ["education-systems", id] as const;
}

export function useEducationSystem(id: string) {
    return useQuery({
        queryKey: educationSystemQueryKey(id),
        queryFn: () => fetchEducationSystem(id),
    });
}
