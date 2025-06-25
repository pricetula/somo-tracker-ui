import { User } from "./user"

export interface Institute {
    id?: string
    name: string
    description: string
    address: string
    website?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
    institute_setting?: InstituteSetting
    contact_user: User
}

export interface InstituteSetting {
    institute_id: string
    isActive: boolean
    logo_url: string
    timezone: string
}

export interface InstituteUser {
    user_id: string
    institute_id: string
    user: User
    institute: Institute
}