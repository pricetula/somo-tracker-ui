import React, { useEffect, useState } from "react"
import { throttle } from "throttle-debounce"
import { ListFilter } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { SearchParamsState } from "../../types"

interface SchoolUsersListFilterProps {
    onSearchParamsChange(params: SearchParamsState): void
}

const throttledHandleSearchParams = throttle(
    2000,
    (fn: (params: SearchParamsState) => void, s: SearchParamsState) => {
        fn(s);
    },
    { noLeading: true, debounceMode: false }
);

export function SchoolUsersListFilter({ onSearchParamsChange }: SchoolUsersListFilterProps) {
    const [searchParams, setSearchParams] = useState<SearchParamsState>({
        roles: [],
        limit: 10,
        searchTerm: "",
        cohortIDs: []
    })

    function handleSearchParams(s: SearchParamsState) {
        setSearchParams(s)
        throttledHandleSearchParams(onSearchParamsChange, s)
    }

    return (
        <div className="flex justify-between mb-8">
            <div className="flex gap-6">
                <Button size="sm" variant="ghost">
                    <ListFilter size="12" />
                    <span>Filter</span>
                </Button>
            </div>
            <Input
                placeholder="Search"
                className="max-w-[200px] mr-12"
                value={searchParams.searchTerm}
                onChange={(e) => {
                    handleSearchParams({
                        ...searchParams,
                        searchTerm: e.target.value,
                    })
                }}
            />
        </div>
    )
}