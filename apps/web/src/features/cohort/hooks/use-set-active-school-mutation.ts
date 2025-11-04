import { useMutation, useQueryClient } from "@tanstack/react-query";
import { School } from "@/features/school/types";
import { schoolsKeys } from "@/features/school/queries/keys";
import { SchoolUser } from "../types";
import { setActiveSchool } from "../services/set-active-school";
import { meKeys } from "../queries/keys";

export function useSetActiveSchoolMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: setActiveSchool,

        // 1. Optimistic Update (Runs before the network request)
        onMutate: async (activeSchoolID: string) => {
            // Cancel any outgoing refetches for 'me' to prevent overwriting
            await queryClient.cancelQueries({ queryKey: meKeys.me });

            // Snapshot the previous 'me' data
            const previousMeData = queryClient.getQueryData<SchoolUser>(meKeys.me);

            // Optimistically update the 'me' data in the cache
            if (previousMeData) {
                // 1. Create a new object for the nested 'user' property
                const updatedUser = {
                    ...previousMeData.user,
                    active_school_id: activeSchoolID
                };

                // 2. Create a new object for the root, incorporating the changes
                const updatedMeData: SchoolUser = {
                    ...previousMeData,
                    school_id: activeSchoolID, // Update root property
                    user: updatedUser,          // Update nested property with the new object
                };

                // 🚀 Update the school_id instantly in the cache
                queryClient.setQueryData<SchoolUser>(meKeys.me, updatedMeData);
            }

            // Return a context object with the snapshot value for rollback
            return { previousMeData };
        },

        // 2. Rollback on Error
        onError: (err, activeSchoolID, context) => {
            // If the mutation fails, roll back the 'me' data to the snapshot
            if (context?.previousMeData) {
                queryClient.setQueryData(meKeys.me, context.previousMeData);
            }
            // Optional: Show error toast/message
            console.error("Failed to set active school:", err);
        },

        // 5. Always runs after success or failure
        onSettled: () => {
            // Good place to ensure everything is synced
            queryClient.invalidateQueries({ queryKey: meKeys.me })
            queryClient.invalidateQueries({ queryKey: schoolsKeys.all })
        },
    });
}