import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { ActionResponse } from "@/shared/types/actions";
import { EducationSystem } from "../types";

type GetEducationSystemsResponse = ActionResponse<EducationSystem[]>;

export async function getEducationSystems(): Promise<GetEducationSystemsResponse> {
    // Initialize response variable to return
    let r: GetEducationSystemsResponse = { success: false, data: [], error: "" }

    try {
        // Attempt to get education systems
        const resp = await authenticatedGet({
            uri: "/education-systems",
        })

        // Check if response is not ok and set error
        if (!resp.ok) {
            const err = await resp.json()
            r.error = err.error || "Failed to get education systems"
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
            r.error = "Unknown error, failed to get education systems"
        }
    }

    // Return result
    return r
}