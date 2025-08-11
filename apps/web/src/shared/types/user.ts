import { ActionResponse } from "./actions"

export interface User {
    id?: string
    email: string
    phone: string
    first_name: string
    last_name: string
    photo_url?: string
    institute_id: string
    active_school_id: string
    external_auth_id?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export type UserResponse = ActionResponse<User | null>