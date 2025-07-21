import { User } from "@/shared/types/user"

export interface InstituteUsers {
    user_id: string
    institute_id: string
    role: string
    user: User
}
