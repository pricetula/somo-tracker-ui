import { useQuery } from "@tanstack/react-query";
import { cohortsListAPIQuery } from "../queries/config";

export function useCohortsListAPIQuery() {
    return useQuery(cohortsListAPIQuery);
}