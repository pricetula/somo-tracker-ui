import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubjects, updateSubject, deleteSubjects } from "@/features/subjects/api/actions";
import type { AddSubjectRequest, UpdateSubjectRequest } from "@/features/subjects/types";

export function useCreateSubjects(yearGroupId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: AddSubjectRequest[]) => createSubjects(body),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["subjects", "year-group", yearGroupId] }),
    });
}

export function useUpdateSubject(yearGroupId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: UpdateSubjectRequest) => updateSubject(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subjects", "year-group", yearGroupId] });
            queryClient.invalidateQueries({ queryKey: ["subjects"] });
        },
    });
}

export function useDeleteSubjects(yearGroupId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids: string[]) => deleteSubjects(ids),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["subjects", "year-group", yearGroupId] }),
    });
}
