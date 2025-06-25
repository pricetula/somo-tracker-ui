export interface User {
    id: string
    email: string
    phone: string
    firstName: string
    lastName: string
    photoUrl: string
    externalAuthId: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    userSetting: UserSetting
}

export interface UserSetting {
    userId: string
    isActive: boolean
    theme: string
}

export interface UserRole {
    userId: string
    role: Role
}

export interface Role {
    id: string
    name: string
    description: string
}
