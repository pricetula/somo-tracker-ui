import { User } from "@/shared/types/user"

export interface Institute {
    id: string
    name: string
    description: string
    address: string
    contactUserId: string
    website: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    contactUser: User
    instituteSetting: InstituteSetting
}

export interface InstituteSetting {
    instituteId: string
    isActive: boolean
    logoUrl: string
    timezone: string
}
