import { useQuery } from "@tanstack/react-query";
import { educationSystemsAPIQuery } from "../queries/config";

export function useEducationSystemsQuery() {
    return useQuery(educationSystemsAPIQuery);
}