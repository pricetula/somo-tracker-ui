import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteUser } from "@/features/invitations/api/actions";
import type { InviteUserRequest } from "@/features/invitations/types";

export function useInviteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: InviteUserRequest) => inviteUser(body),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["invitations"] });
        },
    });
}
