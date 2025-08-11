export interface School {
    id?: string
    institute_id: string
    education_system_id: string
    name: string
    description: string
    address: string
    website: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export interface CreateSchool {
    name: string
    address: string
    description: string
    education_system_id: string
    website?: string | undefined
}