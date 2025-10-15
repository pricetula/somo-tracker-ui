import { useMutation } from "@tanstack/react-query";
import { createOnboardLearningInstitute } from "../services/create-learning-institute";

export function useCreateOnboardLearningInstituteMutation() {
    return useMutation({
        mutationFn: createOnboardLearningInstitute,
    });
}