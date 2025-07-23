import { redirect } from "next/navigation"
import { getMe } from "@/features/me/services/get-me"
import { MeHydrator } from "@/features/me/store"
import { SchoolsHydrator } from "@/features/school/store";
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout";
import { getSchools } from "@/features/school/services/get-school";
import { InstituteUser } from "@/features/me/types";

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children }: { children: React.ReactNode }) {
    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | null

    try {
        me = await getMe();
    } catch (error) {
        redirect("/signout");
    }

    // If me institute is not defined, redirect to the create institute page
    if (!me?.institute) {
        redirect("/create-institute");
    }

    // get the schools for the current user
    let { data: schools } = await getSchools();

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