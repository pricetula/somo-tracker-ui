import { redirect } from "next/navigation";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/get-access-token-from-auth-cookie";
import { createInvitation } from "./actions";
import { CreateInvitationForm } from "./CreateInvitationForm";

export async function CreateInvitation() {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signout");
    }

    return (
        <div className="p-8 rounded-lg bg-gray-100">
            <CreateInvitationForm onSubmit={createInvitation} />
        </div>
    )
}