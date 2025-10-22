import React from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { makeQueryClient } from "@/shared/lib/query-client"
import { converRoleStringToArray } from "../../utils"
import { GetSchoolUsersInput } from "../../types"
import { schoolUsersQuery } from "../../queries/config"
import { List } from "./components/list"

interface SchoolUsersListProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function SchoolUsersList({ searchParams }: SchoolUsersListProps) {
    const queryClient = makeQueryClient()

    const params = await searchParams

    const roleString = typeof params.roles === "string"
        ? params.roles
        : ""

    const filters: GetSchoolUsersInput = {
        roles: converRoleStringToArray(roleString),
        searchTerm: typeof params.search_term === "string"
            ? params.search_term
            : "",
        cohortIDs: typeof params.cohort_ids === "string"
            ? params.cohort_ids.split(",").filter(Boolean)
            : [],
        lastSeenCreatedAt: params.last_seen_created_at
            ? new Date(params.last_seen_created_at as string)
            : null,
    }

    await queryClient.prefetchQuery(schoolUsersQuery(filters))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
        </HydrationBoundary>
    )
}