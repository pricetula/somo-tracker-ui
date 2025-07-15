"use client"

import { useEffect } from "react"
import { useEducationSystemsStore } from "./store"
import { EducationSystem } from "./types"

interface EducationSystemsHydratorProps {
    educationSystems: EducationSystem[]
}

// Hydrates the education systems store with the me data from the server
export function EducationSystemsHydrator({ educationSystems }: EducationSystemsHydratorProps) {
    const setEducationSystems = useEducationSystemsStore((s) => s.setEducationSystems)

    useEffect(() => {
        if (educationSystems?.length) setEducationSystems(educationSystems)
    }, [educationSystems, setEducationSystems])

    return null
}
