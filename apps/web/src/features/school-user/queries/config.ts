import { getSchoolUsers } from "../services/get-school-users";
import { getSchoolUsersAPI } from "../services/get-school-users-api";
import { GetSchoolUsersState } from "../types";
import { schoolUsersKeys } from "./keys";

export const schoolUsersQuery = (filters: GetSchoolUsersState) => ({
    queryKey: schoolUsersKeys.list(filters),
    queryFn: () => getSchoolUsers(filters),
});

export const schoolUsersAPIQuery = (filters: GetSchoolUsersState) => ({
    queryKey: schoolUsersKeys.list(filters),
    queryFn: () => getSchoolUsersAPI(filters),
});

export const schoolUsersDetailQuery = (id: string) => ({
    queryKey: schoolUsersKeys.detail(id),
    queryFn: console.log,
});