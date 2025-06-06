import { Signin } from "@/components/page/signin"

export default function Page() {
    async function signInWithEmail(email: string) {
        "use server"
        console.log(email)

    }

    return (
        <Signin signInWithEmail={signInWithEmail} />
    )
}
