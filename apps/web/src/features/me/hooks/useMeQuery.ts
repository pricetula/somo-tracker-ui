import { useQuery } from "@tanstack/react-query";
import { meQuery } from "../queries/config";

export function useMeQuery() {
    return useQuery(meQuery);
}