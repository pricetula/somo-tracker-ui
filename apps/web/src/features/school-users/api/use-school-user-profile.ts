import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    fetchStudentProfile,
    fetchFacultyProfile,
    fetchGuardianProfile,
    fetchAdminProfile,
} from "./fetch-school-user-profile";
import { updateUser } from "./actions";
import type {
    StudentProfile,
    FacultyProfile,
    GuardianProfile,
    AdminProfile,
    UpdateUserRequest,
} from "@/features/school-users/types";
import type { ActionResult } from "@/types/action-result";

type AnyProfile = StudentProfile | FacultyProfile | GuardianProfile | AdminProfile;

interface UpdateProfileVars {
    userId: string;
    userFields: UpdateUserRequest;
    queryKey: readonly unknown[];
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, userFields }: UpdateProfileVars) => {
            await updateUser(userId, userFields);
        },
        onMutate: async ({ queryKey, userFields }) => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (old: ActionResult<AnyProfile> | undefined) => {
                if (!old?.success) return old;
                return {
                    ...old,
                    data: {
                        ...old.data,
                        ...userFields,
                    },
                };
            });
            return { previous };
        },
        onError: (_err, { queryKey }, context) => {
            if (context?.previous !== undefined) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },
        onSettled: (_data, _err, { queryKey }) => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
}

export function studentProfileQueryKey(userId: string) {
    return ["school-users", "profile", "student", userId] as const;
}

export function facultyProfileQueryKey(userId: string) {
    return ["school-users", "profile", "faculty", userId] as const;
}

export function guardianProfileQueryKey(userId: string) {
    return ["school-users", "profile", "guardian", userId] as const;
}

export function adminProfileQueryKey(userId: string) {
    return ["school-users", "profile", "admin", userId] as const;
}

export function useStudentProfile(userId: string) {
    return useQuery({
        queryKey: studentProfileQueryKey(userId),
        queryFn: () => fetchStudentProfile(userId),
    });
}

export function useFacultyProfile(userId: string) {
    return useQuery({
        queryKey: facultyProfileQueryKey(userId),
        queryFn: () => fetchFacultyProfile(userId),
    });
}

export function useGuardianProfile(userId: string) {
    return useQuery({
        queryKey: guardianProfileQueryKey(userId),
        queryFn: () => fetchGuardianProfile(userId),
    });
}

export function useAdminProfile(userId: string) {
    return useQuery({
        queryKey: adminProfileQueryKey(userId),
        queryFn: () => fetchAdminProfile(userId),
    });
}
