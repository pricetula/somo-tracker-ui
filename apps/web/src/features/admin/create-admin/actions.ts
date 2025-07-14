import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { postApi } from "@/shared/lib/api";
import { CreateAdminSchema } from "./form-schema";
import { ActionResponse } from "@/shared/types/actions";
import { User } from "@/shared/types/user";

export async function createAdmin(adminData: CreateAdminSchema): Promise<ActionResponse<User | null>> {
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
            throw new Error(data.error || "Failed to create admin");
        }
        // Assuming the response contains the created admin data
        return { success: true, data, error: "" };
    } catch (err: any) {
        return { success: false, data: null, error: err.message || "Network/server error" };
    }
}