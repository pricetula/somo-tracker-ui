import { Institute } from "@/features/institutes/types";
import { ActionResponse } from "@/shared/types/actions";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { postApi } from "@/shared/lib/api";

/**
 * Creates a new institute.
 *
 * @param i The institute to create.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function createInstitute(i: Institute): Promise<ActionResponse<Institute | null>> {
    "use server";
    try {
        const token = await getAccessTokenFromAuthCookie();
        const resp = await postApi({
            token,
            body: i,
            uri: "/institutes",
        })
        const data = await resp.json();
        if (!resp.ok) {
            throw new Error(data.error || "Failed to create institute");
        }
        // Assuming the response contains the created institute data
        return { success: true, data, error: "" };
    } catch (err: any) {
        return { success: false, data: null, error: err.message || "Network/server error" };
    }
}
