import { redirect } from "next/navigation"
import { InstituteUser } from "@/features/me/types"
import { getMe } from "@/features/me/services/get-me"
import { CreateInstituteForm } from "./CreateInstituteForm"
import { createInstitute } from "../../services/create-institute"

export async function CreateInstitute() {
    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | null

    // Attempt to get me, if an error occurs then logout
    try {
        me = await getMe()
    } catch (error) {
        redirect("/signout")
    }

    // If me institute is already available, redirect to the create school page
    if (me?.institute) {
        redirect("/create-school")
    }

    return (
        <div className="h-full flex items-center justify-center">
            <CreateInstituteForm createInstitute={createInstitute} />
        </div>
    )
}