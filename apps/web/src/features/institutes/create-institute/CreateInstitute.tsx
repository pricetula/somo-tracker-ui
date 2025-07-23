import { redirect } from "next/navigation";
import { InstituteUser } from "@/features/me/types";
import { getMe } from "@/features/me/get-me";
import { createInstitute } from "./actions";
import { CreateInstituteForm } from "./CreateInstituteForm";

export async function CreateInstitute() {
    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | null

    try {
        me = await getMe();
    } catch (error) {
        redirect("/signout");
    }

    // If me institute is not defined, redirect to the create institute page
    if (me?.institute) {
        redirect("/create-school");
    }

    return (
        <div className="h-full flex items-center justify-center">
            <CreateInstituteForm createInstitute={createInstitute} />
        </div>
    )
}