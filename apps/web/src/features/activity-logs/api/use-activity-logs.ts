import { useSuspenseQuery } from "@tanstack/react-query";
import { getActivityLogs } from "@/features/activity-logs/api/actions";

export const activityLogsMeta = {
  queryKey: ["activity-logs"] as const,
  queryFn: getActivityLogs,
};

export function useActivityLogs() {
  return useSuspenseQuery({
    queryKey: activityLogsMeta.queryKey,
    queryFn: activityLogsMeta.queryFn,
  });
}
