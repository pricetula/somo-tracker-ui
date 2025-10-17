import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meKeys } from "@/features/me/queries/keys";
import { UpdateSchoolUserRole, SchoolUser, GetSchoolUsersInput } from "../types";
import { updateSchoolUserRole } from "../services/update-school-user-role";
import { schoolUsersKeys } from "../queries/keys";
import { Role } from "@/shared/types/user";

export function useUpdateSchoolUserRoleMutation(f: GetSchoolUsersInput) {
    const queryClient = useQueryClient();

    const queryKey = schoolUsersKeys.list(f)

    return useMutation({
        mutationFn: updateSchoolUserRole,

        // 2. Optimistic Update Logic
        onMutate: async (d: UpdateSchoolUserRole) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey })

            // Snapshot the previous value
            const previousSchoolUsers = queryClient.getQueryData<SchoolUser[]>(queryKey)

            // Optimistically update the cache
            if (previousSchoolUsers) {
                // Create a temporary ID for the optimistic item (e.g., negative number)
                const index = previousSchoolUsers.findIndex((schoolUser) => schoolUser.user_id === d.user_id)

                queryClient.setQueryData<SchoolUser[]>(queryKey, [
                    ...previousSchoolUsers.slice(0, index),
                    {
                        ...previousSchoolUsers[index],
                        role: d.role as Role,
                    } as SchoolUser,
                    ...previousSchoolUsers.slice(index + 1),
                ])
            }

            // Return a context object with the snapshot value
            return { previousSchoolUsers }
        },

        // 4. Error handler (Rollback on failure)
        onError: (err, newSchoolData, context) => {
            // Roll back to the previous data if the mutation fails
            if (context?.previousSchoolUsers) {
                queryClient.setQueryData(queryKey, context.previousSchoolUsers)
            }
        },

        // 5. Always runs after success or failure
        onSettled: () => {
            // Good place to ensure everything is synced
            queryClient.invalidateQueries({ queryKey })
        },
    });
}