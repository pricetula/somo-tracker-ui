"use server"

import { ActionResponse } from "@/shared/types/actions"
import { authenticatedPost } from "@/features/auth/utils/authenticated-post"
import { CreateInvitation, Invitation } from "../types"

export type CreateInvitationResponse = ActionResponse<Invitation | null>

export async function createInvitation(d: CreateInvitation): Promise<CreateInvitationResponse> {
    // Initialize response variable to return
    let r: CreateInvitationResponse = { success: false, data: null, error: "" }

    try {
        // Attempt to create Invitation and new user
        const resp = await authenticatedPost({
            uri: "/invitations",
            body: d,
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.json()
            r.error = err.error || "Failed to create invitation"
            return r
        }

        // Get data from response and set to response variable
        const data = await resp.json()
        r.success = true
        r.data = data
    } catch (err) {
        if (err instanceof Error) {
            r.error = err.message
        } else {
            r.error = "Unknown error, failed to create invitation"
        }
    }

    // Return result
    return r
}