"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { buildSchoolUsersURL, getSchoolUsersFilterFromSearchParam } from "../utils"
import { createContext, useContext, useMemo, useCallback } from "react"
import { GetSchoolUsersInput } from "../types"

interface SchoolUsersContextValue {
    filters: GetSchoolUsersInput
    onSearchParamsChange: (s: GetSchoolUsersInput) => void
}

const SchoolUsersContext = createContext<SchoolUsersContextValue | null>(null)

export function SchoolUsersProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const filters = useMemo(() => getSchoolUsersFilterFromSearchParam(searchParams), [searchParams])

    const onSearchParamsChange = useCallback(
        (s: GetSchoolUsersInput) => {
            const newUrl = buildSchoolUsersURL("/users", s)
            router.push(newUrl, { scroll: false })
            // window.location.replace(newUrl)
        },
        [router]
    )

    const value = useMemo(() => ({ filters, onSearchParamsChange }), [filters, onSearchParamsChange])

    return <SchoolUsersContext.Provider value={value}>{children}</SchoolUsersContext.Provider>
}

export function useSchoolUsersContext() {
    const ctx = useContext(SchoolUsersContext)
    if (!ctx) throw new Error("useSchoolUsersContext must be used within a SchoolUsersProvider")
    return ctx
}
