"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function Page() {
    const router = useRouter()
    async function signOut() {
        const supabase = await createClient()
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error signing out:", error)
            return
        }
        router.push("/")
    }

    useEffect(() => {
        signOut()
    }, [])

    return (
        <div>
            Signing out...
        </div>
    )
}