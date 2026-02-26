import { useSuspenseQuery } from "@tanstack/react-query";
import { getInvitations } from "@/features/invitations/api/actions";

export const invitationsMeta = {
  queryKey: ["invitations"] as const,
  queryFn: getInvitations,
};

export function useInvitations() {
  return useSuspenseQuery({
    queryKey: invitationsMeta.queryKey,
    queryFn: invitationsMeta.queryFn,
  });
}
