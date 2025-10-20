import React, { useState } from "react"
import { throttle } from "throttle-debounce"
import { Input } from "@/shared/components/ui/input"
import { SearchParamsState } from "@/features/school-user/types"
import { FilterMenu } from "./components/filter-menu"
import { AddUsers } from "./components/add-users"

interface SchoolUsersListHeaderProps {
    onSearchParamsChange(params: SearchParamsState): void
}

const throttledHandleSearchParams = throttle(
    1500,
    (fn: (params: SearchParamsState) => void, s: SearchParamsState) => {
        fn(s);
    },
    { noLeading: true, debounceMode: false }
);

export function SchoolUsersListHeader({ onSearchParamsChange }: SchoolUsersListHeaderProps) {
    const [searchParams, setSearchParams] = useState<SearchParamsState>({
        roles: [],
        searchTerm: "",
        cohortIDs: []
    })

    function handleSearchParams(s: SearchParamsState) {
        setSearchParams(s)
        throttledHandleSearchParams(onSearchParamsChange, s)
    }

    return (
        <div className="flex justify-between mb-8 md:mr-12">
            <div className="flex items-center gap-4 px-4">
                <FilterMenu />
                <Input
                    placeholder="Search"
                    className="max-w-[200px] h-[30px]"
                    value={searchParams.searchTerm}
                    onChange={(e) => {
                        handleSearchParams({
                            ...searchParams,
                            searchTerm: e.target.value,
                        })
                    }}
                />
            </div>
            <AddUsers />
        </div>
    )
}