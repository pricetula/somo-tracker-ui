import { User } from "@/shared/types/user"
import { Institute } from "@/features/institutes/types"

export interface InstituteUser {
    instituteId: string
    userId: string
    institute: Institute
    user: User
}
