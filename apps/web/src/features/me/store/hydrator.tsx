"use client"

import { useEffect } from "react"
import { User } from "@/shared/types/user"
import { useMeStore } from "./store"

interface MeHydratorProps {
    me: User
}

// Hydrates the me store with the me data from the server
export function MeHydrator({ me }: MeHydratorProps) {
    const setMe = useMeStore((s) => s.setMe)

    useEffect(() => {
        if (me) setMe(me)
    }, [me, setMe])

    return null
}
