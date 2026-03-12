import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestions, updateQuestion, deleteQuestions } from "@/features/questions/api/actions";
import type { AddQuestionRequest, UpdateQuestionRequest } from "@/features/questions/types";

export function useCreateQuestions(topicId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: AddQuestionRequest[]) => createQuestions(body),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["questions", "topic", topicId] }),
    });
}

export function useUpdateQuestion(topicId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: UpdateQuestionRequest) => updateQuestion(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions", "topic", topicId] });
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });
}

export function useDeleteQuestions(topicId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids: string[]) => deleteQuestions(ids),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["questions", "topic", topicId] }),
    });
}
