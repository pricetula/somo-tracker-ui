import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchInvitations } from "./fetch-invitations";

export const invitationsQueryKey = ["invitations"] as const;

export function useInvitations() {
    return useSuspenseQuery({
        queryKey: invitationsQueryKey,
        queryFn: fetchInvitations,
    });
}
