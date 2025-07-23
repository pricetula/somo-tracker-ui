import { format } from "date-fns"
import { redirect } from "next/navigation"
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/get-access-token-from-auth-cookie"
import { CreateInvitation } from "../create-invitation"
import { getInvitations } from "../queries"

export async function InvitationsList() {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie()

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signout")
    }

    // Get the invitations from api
    let invitations = (await getInvitations()) || []

    return (
        <div>
            <CreateInvitation />
            <ul className="space-y-4">
                {invitations.map((invitation) => (
                    <li
                        key={invitation.id}
                        className="bg-white shadow-sm rounded-2xl p-4 border border-gray-200"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-800">{invitation.email}</p>
                                <p className="text-xs text-gray-500">{invitation.role}</p>
                            </div>
                            <div className="text-xs text-gray-400">
                                {invitation.accepted_at
                                    ? "Accepted"
                                    : "Pending"}
                            </div>
                        </div>
                        <div className="mt-2 text-[11px] text-gray-400">
                            Invited on {format(new Date(invitation.created_at), "MM/dd/yyyy")}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}