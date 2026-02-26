import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/features/users/api/actions";

export function userMeta(id: string) {
  return {
    queryKey: ["users", id] as const,
    queryFn: () => getUser(id),
  };
}

export function useUser(id: string) {
  return useQuery(userMeta(id));
}
