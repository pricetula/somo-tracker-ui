import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { EducationSystem } from "../types";

export async function getEducationSystems(): Promise<EducationSystem[]> {
    // Attempt to get education systems
    const resp = await authenticatedGet({
        uri: "/education-systems",
    })

    // Check if response is not ok and set error
    if (!resp.ok) {
        const err = await resp.text()
        throw err || "Failed to get education systems"
    }

    // Get data from response and set to response variable
    return await resp.json()
}