"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useSchoolUsersQuery } from "../../hooks/useSchoolUsersQuery"
import { getSchoolUsersFilterFromSearchParam } from "../../utils/getSchoolUsersFilterFromSearchParam"

export function SchoolUsersList() {
    const searchParams = useSearchParams()

    const filters = getSchoolUsersFilterFromSearchParam(searchParams)
    const { data, isLoading } = useSchoolUsersQuery(filters)

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {
                data?.map?.(
                    (schoolUser) => (
                        <div>
                            {schoolUser.user.first_name}
                        </div>
                    )
                )
            }
        </div>
    )
}