
import { ActionResponse } from "@/shared/types/actions";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { postApi } from "@/shared/lib/api";

/**
 * Creates a new institute.
 *
 * @param i The institute to create.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function createInvitation(body: { email_addresses: string[] }): Promise<ActionResponse<null>> {
    "use server";
    try {
        const d = body
        const token = await getAccessTokenFromAuthCookie();
        const resp = await postApi({
            token,
            body: d,
            uri: "/invitations",
        })
        if (!resp.ok) {
            const err = await resp.text();
            throw new Error(err || "Failed to create invitation");
        }
        // Assuming the response contains the created institute data
        return { success: true, data: null, error: "" };
    } catch (err: any) {
        return { success: false, data: null, error: err.message || "Network/server error" };
    }
}
