import { postApi } from "@/shared/lib/api";
import { ActionResponse } from "@/shared/types/actions";
import { User } from "@/shared/types/user";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/get-access-token-from-auth-cookie";
import { OnboardNewAdminSchema } from "./form-schema";

export async function onboardNewAdmin(adminData: OnboardNewAdminSchema): Promise<ActionResponse<User | null>> {
    "use server";
    try {
        const token = await getAccessTokenFromAuthCookie();
        const resp = await postApi({
            token,
            body: adminData,
            uri: "/admins",
        });
        const data = await resp.json();
        if (!resp.ok) {
            return {
                success: false,
                data: null,
                error: data.error || "Failed to onboard new admin",
            };
        }
        // Assuming the response contains the created admin data
        return { success: true, data, error: "" };
    } catch (err: any) {
        return { success: false, data: null, error: err.message || "Network/server error" };
    }
}