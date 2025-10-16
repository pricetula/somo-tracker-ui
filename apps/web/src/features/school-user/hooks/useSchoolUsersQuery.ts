import { useQuery } from "@tanstack/react-query"
import { schoolUsersAPIQuery } from "../queries/config"
import { GetSchoolUsersInput } from "../types"

export function useSchoolUsersQuery(filters: GetSchoolUsersInput) {
    return useQuery(schoolUsersAPIQuery(filters))
}