import { redirect } from "next/navigation"
import { getMe } from "@/features/me/get-me"
import { MeHydrator } from "@/features/me/store-hydrator"
import { InstituteUser } from "@/features/me/types"
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
    let me: InstituteUser | undefined;

    try {
        // Try to get the current user and their institute
        me = await getMe(token);
    } catch (error: any) {
        // If failed to get user info, redirect to create admin onboarding
        if (error.message && error.message.includes("Failed to get user info")) {
            redirect("/create-admin");
        }
        // If any other error, redirect to signout
        redirect("/signout");
    }

    return (
        <main className="h-screen overflow-y-auto">
            {children}
            <MeHydrator me={me} />
        </main>
    )
}