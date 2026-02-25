import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTopics, updateTopic, deleteTopics } from "@/features/topics/api/actions";
import type { AddTopicRequest, UpdateTopicRequest } from "@/features/topics/types";

export function useCreateTopics(subjectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddTopicRequest[]) => createTopics(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["topics", "subject", subjectId] }),
  });
}

export function useUpdateTopic(subjectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateTopicRequest) => updateTopic(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics", "subject", subjectId] });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
}

export function useDeleteTopics(subjectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => deleteTopics(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["topics", "subject", subjectId] }),
  });
}
