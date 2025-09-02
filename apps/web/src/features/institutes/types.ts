import { User } from "@/shared/types/user"

export interface Institute {
    id: string
    name: string
    description: string
    address: string
    contact_user_id: string
    website: string
    created_at: string
    updated_at: string
    deleted_at: string
    contact_user: User
    institute_setting: InstituteSetting
}

export interface InstituteSetting {
    institute_id: string
    is_active: boolean
    logo_url: string
    timezone: string
}

export interface CreateInstitute {
    email: string
    name: string
    description: string
    first_name: string
    last_name: string
    website?: string | undefined
}