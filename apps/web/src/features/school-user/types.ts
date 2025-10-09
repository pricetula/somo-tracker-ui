import { School } from "@/features/school/types"
import { Role, User } from "@/features/user/types"

export interface SchoolUser {
    school_id: string
    user_id: string
    school: School
    role: Role
    user: User
}