"use client"

import { useEffect } from "react"
import { useMeStore } from "@/features/me/store"
import { InstituteUser } from "./types"

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
