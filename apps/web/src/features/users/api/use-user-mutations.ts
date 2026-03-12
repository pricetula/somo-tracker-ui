import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/features/users/api/actions";
import type { UpdateUserRequest } from "@/features/users/types";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: UpdateUserRequest) => updateUser(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
}
