import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSchool, School } from "../types";
import { createSchool } from "../services/create-school";
import { schoolsKeys } from "../queries/keys";

export function useCreateSchoolMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSchool,
        // 2. Optimistic Update Logic
        onMutate: async (newSchoolData: CreateSchool) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: schoolsKeys.all })

            // Snapshot the previous value
            const previousSchools = queryClient.getQueryData<School[]>(schoolsKeys.all)

            // Optimistically update the cache
            if (previousSchools) {
                // Create a temporary ID for the optimistic item (e.g., negative number)
                const optimisticSchool: School = {
                    ...newSchoolData,
                    institute_id: 's',
                    id: Date.now() + '', // Use a temporary, unique client-side ID
                    created_at: new Date().toISOString(),
                }

                queryClient.setQueryData<School[]>(schoolsKeys.all, [
                    ...previousSchools,
                    optimisticSchool
                ])
            }

            // Return a context object with the snapshot value
            return { previousSchools }
        },
        // 3. Success handler (Runs after the Server Action successfully returns the *real* data)
        onSuccess: (newSchool) => {
            // Optional: Invalidate and refetch the list to ensure data is correct
            queryClient.invalidateQueries({ queryKey: schoolsKeys.all })

            // Or, update the cache with the real school data (including the server-assigned ID)
            // This can be more complex if you rely on the temporary ID from onMutate
        },

        // 4. Error handler (Rollback on failure)
        onError: (err, newSchoolData, context) => {
            // Roll back to the previous data if the mutation fails
            if (context?.previousSchools) {
                queryClient.setQueryData(schoolsKeys.all, context.previousSchools)
            }
            alert(`Creation failed: ${err.message}`)
        },

        // 5. Always runs after success or failure
        onSettled: () => {
            // Good place to ensure everything is synced
            queryClient.invalidateQueries({ queryKey: schoolsKeys.all })
        },
    });
}