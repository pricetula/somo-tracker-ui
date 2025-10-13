import { getEducationSystems } from "../services/get-education-system";
import { getEducationSystemsAPI } from "../services/get-education-system-api";
import { educationSystemsKeys } from "./keys";

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24; // 24 hours

export const educationSystemsQuery = {
    queryKey: educationSystemsKeys.all,
    queryFn: getEducationSystems,
};

export const educationSystemsAPIQuery = {
    queryKey: educationSystemsKeys.all,
    queryFn: getEducationSystemsAPI,
    // Data is considered "fresh" for 24 hours. No background refetching during this time.
    staleTime: ONE_DAY_IN_MS,
    // Keep the data in the cache for 24 hours after it becomes inactive.
    gcTime: ONE_DAY_IN_MS,
};