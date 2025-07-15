"use client"

import { useEffect } from "react"
import { useSchoolsStore } from "./store"
import { School } from "./types"

interface SchoolsHydratorProps {
    schools: School[]
}

// Hydrates the me store with the me data from the server
export function SchoolsHydrator({ schools }: SchoolsHydratorProps) {
    const setSchools = useSchoolsStore((s) => s.setSchools)

    useEffect(() => {
        if (schools.length) setSchools(schools)
    }, [schools, setSchools])

    return null
}
