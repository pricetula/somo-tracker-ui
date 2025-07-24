"use client"

import { useEffect } from "react"
import { InstituteUser } from "../types"
import { useMeStore } from "./store"

interface MeHydratorProps {
    me: InstituteUser
}

// Hydrates the me store with the me data from the server
export function MeHydrator({ me }: MeHydratorProps) {
    const setMe = useMeStore((s) => s.setMe)

    useEffect(() => {
        if (me) setMe(me)
    }, [me, setMe])

    return null
}
