"use server"

import { putApi } from "@/shared/lib/api"
import { ApiInput } from "@/shared/lib/api/types"
import { AuthenticatedPutError } from "../errors"
import { handleAuthenticatedRequest } from "./handle-authenticated-request"

export async function authenticatedPut(d: ApiInput): Promise<Response> {
    // Make get request
    const resp = await handleAuthenticatedRequest(d, putApi)

    // If response is not ok then check what the error is
    if (!resp.ok) {
        const error = await resp.text()

        // Throw error if not related to token expiry
        throw new AuthenticatedPutError(error)
    }
    return resp
}