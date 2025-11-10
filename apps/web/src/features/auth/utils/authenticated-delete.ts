"use server"

import { deleteApi } from "@/shared/lib/api"
import { ApiInput } from "@/shared/lib/api/types"
import { AuthenticatedDeleteError } from "../errors"
import { handleAuthenticatedRequest } from "./handle-authenticated-request"

export async function authenticatedDelete(d: ApiInput): Promise<Response> {
    // Make get request
    const resp = await handleAuthenticatedRequest(d, deleteApi)

    // If response is not ok then check what the error is
    if (!resp.ok) {
        const error = await resp.text()

        // Throw error if not related to token expiry
        throw new AuthenticatedDeleteError(error)
    }
    return resp

}