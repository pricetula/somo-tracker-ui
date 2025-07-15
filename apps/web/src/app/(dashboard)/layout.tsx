import { redirect } from "next/navigation"
import { getMe } from "@/features/me/get-me"
import { MeHydrator } from "@/features/me/store-hydrator"
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies"

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children }: { children: React.ReactNode }) {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signin");
    }

    // Variable to hold me data which is the current user and their institute
    let me = await getMe(token);

    // If me institute is not defined, redirect to the create institute page
    if (!me?.institute) {
        redirect("/create-institute");
    }


    return (
        <main className="h-screen overflow-y-auto">
            {children}
            <MeHydrator me={me} />
        </main>
    )
}