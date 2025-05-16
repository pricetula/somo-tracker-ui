import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default async function Page() {
    const router = useRouter()
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/login")
            },
        },
    })
    return (
        <div>
            Signing out...
        </div>
    )
}