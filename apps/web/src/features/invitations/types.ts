export interface Invitation {
    id: string
    email: string
    institute_id: string
    role: string
    accepted_at: string
    created_at: string
    updated_at: string
}

export interface CreateInvitation {
    email_addresses: string[]
}