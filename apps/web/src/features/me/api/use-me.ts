import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/me/api/actions";

export const meMeta = {
  queryKey: ["me"] as const,
  queryFn: getMe,
};

export function useMe() {
  return useQuery({
    queryKey: meMeta.queryKey,
    queryFn: meMeta.queryFn,
  });
}
