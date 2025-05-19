import { Signin } from "@/components/page/signin"
import { createClient } from "@/lib/supabase/server"

export default function Page() {
    async function signInWithEmail(email: string) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.signInWithOtp({
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
        if (data) {
            console.log("Sign in data:", data)
        }
    }

    return (
        <Signin signInWithEmail={signInWithEmail} />
    )
}
