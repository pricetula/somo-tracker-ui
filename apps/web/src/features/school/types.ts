import { Role, User } from "@/shared/types/user"

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

export interface SchoolUser {
    school_id: string
    user_id: string
    role: Role
    school: School
    user: User
}