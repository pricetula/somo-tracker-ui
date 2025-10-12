import { useQuery } from "@tanstack/react-query";
import { schoolsAPIQuery } from "../queries/config";

export function useSchoolsQuery() {
    return useQuery(schoolsAPIQuery);
}