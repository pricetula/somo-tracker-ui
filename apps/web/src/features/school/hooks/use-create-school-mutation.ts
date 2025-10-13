import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meKeys } from "@/features/me/queries/keys";
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

            // Temporary ID for newly added school
            const tempID = `local-id-${Date.now()}`

            // Optimistically update the cache
            if (previousSchools) {
                // Create a temporary ID for the optimistic item (e.g., negative number)
                const optimisticSchool: School = {
                    ...newSchoolData,
                    // Use a temporary, unique client-side ID
                    id: tempID,
                    institute_id: "",
                    created_at: new Date().toISOString(),
                }

                queryClient.setQueryData<School[]>(schoolsKeys.all, [
                    ...previousSchools,
                    optimisticSchool
                ])
            }

            // Return a context object with the snapshot value
            return { previousSchools, tempID }
        },

        // 3. Success handler (Runs after the Server Action successfully returns the *real* data)
        onSuccess: (newSchool, variables, context) => {
            // Get the locally set temp id
            const tempID = context?.tempID

            // Get the current schools list from the cache
            const currentSchools = queryClient.getQueryData<School[]>(schoolsKeys.all)

            if (currentSchools && tempID) {
                // Find the index of the temporary school
                const tempIndex = currentSchools.findIndex(school => school.id === tempID)

                if (tempIndex !== -1) {
                    // Create a new array, replacing the temporary object at tempIndex with the real server data
                    const updatedSchools = [
                        ...currentSchools.slice(0, tempIndex), // Items before the temporary one
                        newSchool,                            // The real school object from the server
                        ...currentSchools.slice(tempIndex + 1), // Items after the temporary one
                    ]

                    // Update the query cache with the final, correct data
                    queryClient.setQueryData<School[]>(schoolsKeys.all, updatedSchools)
                } else {
                    // Fallback: If for some reason the temp item wasn't found, just refetch
                    queryClient.invalidateQueries({ queryKey: schoolsKeys.all })
                }
            } else {
                // Fallback: If no current data, just refetch
                queryClient.invalidateQueries({ queryKey: meKeys.me })
                queryClient.invalidateQueries({ queryKey: schoolsKeys.all })
            }
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