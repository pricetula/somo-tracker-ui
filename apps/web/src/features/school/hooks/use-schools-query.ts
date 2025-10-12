import { useQuery } from "@tanstack/react-query";
import { schoolsQuery } from "../queries/config";

export function useSchoolsQuery() {
    return useQuery(schoolsQuery);
}