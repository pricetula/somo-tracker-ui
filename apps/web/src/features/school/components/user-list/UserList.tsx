import { SchoolUser } from "../../types"

interface UserListProps {
    initialisedUsers: SchoolUser[]
}

export function UserList({ initialisedUsers }: UserListProps) {
    console.log("initialisedUsers", initialisedUsers)
    return (
        <div>ss</div>
    )
}