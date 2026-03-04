import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchActivityLogs } from "./fetch-activity-logs";

export const activityLogsQueryKey = ["activity-logs"] as const;

export function useActivityLogs() {
  return useSuspenseQuery({
    queryKey: activityLogsQueryKey,
    queryFn: fetchActivityLogs,
  });
}
