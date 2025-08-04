import { User } from "@/shared/types/user"
import { Institute } from "@/features/institutes/types"
import { EducationSystem } from "@/features/education-system/types"

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

export interface SchoolSetting {
    school_id: string
    is_active: boolean
    logo_url: string
    timezone: string
    currency: string
    academic_year_start: string
    academic_year_end: string
}

export interface CreateSchool {
    name: string
    address: string
    description: string
    education_system_id: string
    website?: string | undefined
}