import * as React from "react"
import { getInstituteUsers } from "../../services/get-institute-users"
import { InstituteUserListTable } from "./InstituteUserListTable"

export async function InstituteUserList() {
    // Get the invitations from api
    let { data: instituteUsers } = await getInstituteUsers()
    return (
        <InstituteUserListTable instituteUsers={instituteUsers} getInstituteUsers={getInstituteUsers} />
    )
}
