"use client"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default function Page() {
    const router = useRouter()
    authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/signin")
            },
        },
    })
    return (
        <div>
            Signing out...
        </div>
    )
}