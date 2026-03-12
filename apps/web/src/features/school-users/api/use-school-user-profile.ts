import { useQuery } from "@tanstack/react-query";
import {
    fetchStudentProfile,
    fetchFacultyProfile,
    fetchGuardianProfile,
    fetchAdminProfile,
} from "./fetch-school-user-profile";

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
