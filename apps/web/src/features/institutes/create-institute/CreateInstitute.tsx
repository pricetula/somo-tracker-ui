import { redirect } from "next/navigation";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/get-access-token-from-auth-cookie";
import { createInstitute } from "./actions";
import { CreateInstituteForm } from "./CreateInstituteForm";

export async function CreateInstitute() {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signout");
    }

    return (
        <div className="h-full flex items-center justify-center">
            <CreateInstituteForm onSubmit={createInstitute} />
        </div>
    )
}