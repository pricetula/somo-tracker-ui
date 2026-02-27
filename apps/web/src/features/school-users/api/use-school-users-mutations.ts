import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSchoolUsers, updateSchoolUser } from "./actions";
import { schoolUsersQueryKey } from "./use-school-users";

export function useAddSchoolUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSchoolUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolUsersQueryKey() });
    },
  });
}

export function useUpdateSchoolUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSchoolUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolUsersQueryKey() });
    },
  });
}
