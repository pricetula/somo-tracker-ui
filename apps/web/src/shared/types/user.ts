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
    userSetting: UserSetting | null
}

export interface UserSetting {
    userId: string
    isActive: boolean
    theme: string
}
