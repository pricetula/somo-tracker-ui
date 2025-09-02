import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { User } from "@/shared/types/user";

export async function getMe(): Promise<User | null> {
    try {
        const resp = await authenticatedGet({ uri: "/me" })
        if (!resp.ok) {
            const error = await resp.text()
            const err = new Error(error || resp.statusText);
            err.name = resp.statusText;
            throw err;
        }
        const meData = await resp.json();
        if (meData.id === "00000000-0000-0000-0000-000000000000") {
            return null
        }
        return meData
    } catch (error: any) {
        if (error.message?.includes("sql: no rows")) {
            return null
        }
        throw error;
    }
}
