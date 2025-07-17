import { redirect } from "next/navigation"
import { getMe } from "@/features/me/get-me"
import { MeHydrator } from "@/features/me/store-hydrator"
import { SchoolsHydrator } from "@/features/school/store-hydrator";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies"
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout";
import { getSchools } from "@/features/school/queries";
import { InstituteUser } from "@/features/me/types";
import { School } from "@/features/school/types";

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children }: { children: React.ReactNode }) {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signout");
    }

    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | null

    try {
        me = await getMe(token);
    } catch (error) {
        redirect("/signout");
    }

    // If me institute is not defined, redirect to the create institute page
    if (!me?.institute) {
        redirect("/create-institute");
    }

    // get the schools for the current user
    let schools: School[] = []
    try {
        schools = await getSchools(token);
    } catch (error) {
        console.log(error)
    }

    // If there are no schools, redirect to the create school page
    if (!schools?.length) {
        redirect("/create-school");
    }

    return (
        <DashboardLayout>
            <main className="h-screen overflow-y-auto">
                {children}
                <MeHydrator me={me} />
                <SchoolsHydrator schools={schools} />
            </main>
        </DashboardLayout>
    )
}