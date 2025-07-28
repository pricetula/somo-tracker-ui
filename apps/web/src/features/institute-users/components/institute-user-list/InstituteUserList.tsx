import * as React from "react"
import { getInstituteUsers } from "../../services/get-institute-users"
import { InstituteUserListTable } from "./InstituteUserListTable"

interface InstituteUserListQueryParams {
    roles?: string
    limit?: number
    lastSeenCreatedAt?: string
}

interface InstituteUserListProps {
    searchParams: Promise<InstituteUserListQueryParams>
}

export async function InstituteUserList({ searchParams }: InstituteUserListProps) {
    // get query parameters
    const params = await searchParams

    // Get the invitations from api
    let { data: instituteUsers } = await getInstituteUsers({
        roles: params.roles,
        limit: params.limit,
        lastSeenCreatedAt: params.lastSeenCreatedAt,
    })


    return (
        <InstituteUserListTable instituteUsers={instituteUsers} getInstituteUsers={getInstituteUsers} />
    )
}
