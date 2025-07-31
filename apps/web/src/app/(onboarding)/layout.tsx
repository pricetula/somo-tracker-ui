import { redirect } from "next/navigation"
import { getMe } from "@/features/me/services/get-me";
import { Nav } from "@/shared/components/layout/nav/Nav";
import { User } from "@/shared/types/user";

export default async function Layout({ children }: { children: React.ReactNode }) {
    // Variable to hold me data which is the current user and their institute
    let me: User | null

    try {
        me = await getMe();
    } catch (error: any) {
        redirect("/signout");
    }

    // If me institute is not defined, redirect to the create institute page
    if (me?.institute_id) {
        redirect("/");
    }

    return (
        <main className="container mx-auto px-4 h-screen">
            <Nav />
            {children}
        </main>
    )
}