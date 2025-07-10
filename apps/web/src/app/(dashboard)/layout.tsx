import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getMe } from "@/features/me/get-me"
import { getSchools } from "@/features/school/get-school"
import { MeHydrator } from "@/features/me/store-hydrator"
import { InstituteUser } from "@/features/me/types"

// This layout is used for the dashboard and requires the user to be logged in
export default async function Layout({ children }: { children: React.ReactNode }) {
    // Get the headers to check the current pathname
    // This is used to determine if the user is on the onboarding page or not
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    console.log("Current pathname:", pathname);

    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | undefined;

    try {
        // Try to get the current user and their institute
        me = await getMe();

        // If the user is not logged in or does not have an institute, redirect to onboarding
        if (!me?.user?.id && !me?.institute?.id && pathname !== "/onboarding") {
            redirect("/onboarding");
        }
    } catch (error) {
        console.log("Error getting user:", error);
        throw error;
        // If there is an error getting the user, redirect to signout
        // redirect("/signout");
    }

    try {
        // Try to get the schools for the current user
        const schools = await getSchools();

        // If the user does not have any schools, redirect to create school
        if (!schools?.length && pathname !== "/onboarding/create-school") {
            redirect("/onboarding/create-school");
        }
    } catch (error) {
        redirect("/onboarding/create-school");
    }

    return (
        <main className="h-screen overflow-y-auto">
            {children}
            <MeHydrator me={me} />
        </main>
    )
}