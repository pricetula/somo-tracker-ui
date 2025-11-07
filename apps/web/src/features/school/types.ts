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
    education_system_id: string
    name: string
    description: string
    address: string
    website: string
    school_type: string
}
