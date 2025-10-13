import { User } from "@/shared/types/user"

export interface Institute {
    id: string
    name: string
    created_at: string
    updated_at: string
    deleted_at: string
}

export interface CreateInstitute {
    email: string
    name: string
    description: string
    first_name: string
    last_name: string
    website?: string | undefined
}