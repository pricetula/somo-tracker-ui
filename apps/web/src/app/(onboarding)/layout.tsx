import { redirect } from "next/navigation";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { getMe } from "@/features/me/get-me";
import { MeHydrator } from "@/features/me/store-hydrator";
import { InstituteUser } from "@/features/me/types";
import { Nav } from "@/shared/components/layout/nav/Nav";

export default async function Layout({ children }: { children: React.ReactNode }) {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signin");
    }

    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | null

    try {
        me = await getMe(token);
    } catch (error) {
        redirect("/signout");
    }

    return (
        <main className="container mx-auto px-4 h-screen">
            <Nav />
            {children}
            {me?.institute && (
                <MeHydrator me={me} />
            )}
        </main>
    )
}