import { Signin } from "@/components/page/signin"
import { createClient } from "@/lib/supabase/server"

export default function Page() {
    async function signInWithEmail(email: string) {
        "use server"
        const supabase = await createClient()
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                // set this to false if you do not want the user to be automatically signed up
                shouldCreateUser: true,
                emailRedirectTo: process.env.PUBLIC_URL,
            },
        })
        if (error) {
            console.error("Error signing in with email:", error)
            return
        }
    }

    return (
        <Signin signInWithEmail={signInWithEmail} />
    )
}
