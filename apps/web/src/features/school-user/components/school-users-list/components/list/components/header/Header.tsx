"use client"

import React, { useMemo, useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { useSchoolUsersContext } from "@/features/school-user/context/school-users-param"
import { debounce } from "@/shared/utils/debounce"
import { FilterMenu } from "./components/filter-menu"
import { AddUsers } from "./components/add-users"

export function Header() {
    const { filters, onSearchParamsChange } = useSchoolUsersContext()

    const [value, setValue] = useState(filters.searchTerm)

    const debouncedUpdate = useMemo(() => debounce(
        onSearchParamsChange,
        1000
    ), [])

    return (
        <div className="flex justify-between mb-8 md:mr-12">
            <div className="flex items-center gap-4 px-4">
                <Input
                    placeholder="Search"
                    className="max-w-[200px] h-[30px]"
                    value={value}
                    onChange={(e) => {
                        debouncedUpdate({
                            ...filters,
                            searchTerm: e.target.value,
                        })
                        setValue(e.target.value)
                    }}
                />
                <FilterMenu />
            </div>
            <AddUsers />
        </div>
    )
}