import { User } from "./user"

export interface Institute {
    id: string
    name: string
    description: string
    address: string
    website: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    instituteSetting: InstituteSetting
    contactUser: User
}

export interface InstituteSetting {
    instituteId: string
    isActive: boolean
    logoUrl: string
    timezone: string
}

export interface InstituteUser {
    userId: string
    instituteId: string
    user: User
    institute: Institute
}