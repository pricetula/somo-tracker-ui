import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./fetch-users";

export function userQueryKey(id: string) {
  return ["users", id] as const;
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userQueryKey(id),
    queryFn: () => fetchUser(id),
  });
}
