"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { requestMagicLink } from "@/features/auth/api/actions";
import type { MagicLinkInput } from "@/features/auth/types/auth-schema";

export function useMagicLink() {
  return useMutation({
    mutationFn: (input: MagicLinkInput) => requestMagicLink(input),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Check your inbox!", {
          description: "We sent you a magic link. It expires in 10 minutes.",
        });
      } else {
        toast.error(result.error ?? "Something went wrong.");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred. Please try again.");
    },
  });
}
