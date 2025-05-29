import { Layout as AppLayout } from "@/components/common/layout"
import { getMe } from "@/lib/service"
import { createClient } from "@/lib/supabase/server"
import { permanentRedirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
    // Initialize Supabase client on the server side
    const supabase = await createClient()

    // Get the session from Supabase
    const {
        data: { session },
    } = await supabase.auth.getSession()

    // If session token is not available, permanently redirect to signin
    if (!session?.access_token) {
        permanentRedirect("/signin")
        return
    }

    try {
        const user = await getMe(session.access_token)
        console.log("User:", user)
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            // If the user is not found, redirect to signout
            permanentRedirect("/signout")
        }
        throw Error(error.message)
    }

    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}