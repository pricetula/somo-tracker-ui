import { School } from "@/features/school/types"
import { Role, User } from "@/features/user/types"

export interface SchoolUser {
    school_id: string
    user_id: string
    school: School
    role: Role
    user: User
}

export interface GetSchoolUsersState {
    roles: Role[];
    searchTerm: string;
    lastSeenCreatedAt: Date | null;
    cohortIDs: string[];
}

export interface UpdateSchoolUserRole {
    user_id: string;
    school_id: string;
    role: Role;
}

export type SearchParamsState = Omit<GetSchoolUsersState, "lastSeenCreatedAt">