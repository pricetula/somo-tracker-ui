import { useQuery } from "@tanstack/react-query"
import { schoolUsersAPIQuery } from "../queries/config"
import { GetSchoolUsersState } from "../types"

export function useSchoolUsersQuery(filters: GetSchoolUsersState) {
    return useQuery(schoolUsersAPIQuery(filters))
}