export interface User {
    id?: string
    email: string
    phone: string
    first_name: string
    last_name: string
    photo_url: string
    external_auth_id?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
    user_setting?: UserSetting
}

export interface UserSetting {
    user_id: string
    is_active: boolean
    theme: string
}

export interface UserRole {
    user_id: string
    role: Role
}

export interface Role {
    id: string
    name: string
    description: string
}
