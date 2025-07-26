import { ActionResponse } from "@/shared/types/actions"
import { User } from "@/shared/types/user"

export interface InstituteUsers {
    user_id: string
    institute_id: string
    role: string
    user: User
}

export type GetInstituteUsersResponse = ActionResponse<InstituteUsers[]>

export interface GetInstituteUsersParams {
    limit?: number
    roles?: string
    lastSeenCreatedAt?: string
}