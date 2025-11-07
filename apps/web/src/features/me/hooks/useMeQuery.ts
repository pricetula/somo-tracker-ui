import { useQuery } from "@tanstack/react-query";
import { meAPIQuery } from "../queries/config";

export function useMeQuery() {
    return useQuery(meAPIQuery);
}