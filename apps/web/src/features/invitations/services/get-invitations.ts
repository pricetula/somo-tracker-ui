import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ActionResponse } from "@/shared/types/actions";
import { Invitation } from "../types";

type GetInvitationsResponse = ActionResponse<Invitation[]>

export async function getInvitations(): Promise<GetInvitationsResponse> {
    // Initialize response variable to return
    let r: GetInvitationsResponse = { success: false, data: [], error: "" }

    try {
        // Attempt to get invitations
        const resp = await authenticatedGet({
            uri: "/invitations",
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.text()
            r.error = err || "Failed to get invitations"
            return r
        }

        // Get data from response and set to response variable
        const data = await resp.json()
        r.success = true
        r.data = data || []
    } catch (err) {
        if (err instanceof Error) {
            r.error = err.message
        } else {
            r.error = "Unknown error, failed to get invitations"
        }
    }

    // Return result
    return r
}