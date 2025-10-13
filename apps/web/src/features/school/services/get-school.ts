import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { School } from "../types";

export async function getSchools(): Promise<School[]> {
    // Attempt to get schools
    const resp = await authenticatedGet({
        uri: "/schools",
    })

    // Check if response is not ok and set error
    if (!resp.ok) {
        const err = await resp.text()
        throw err || "Failed to get schools"
    }

    // Get data from response and set to response variable
    return await resp.json()
}