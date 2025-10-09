import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { SchoolUser } from "@/features/school-user/types";
import { isUUIDNil } from "@/shared/utils/is-uuid-nil";

export async function getMe(): Promise<SchoolUser | null> {
    try {
        const resp = await authenticatedGet({ uri: "/me" })
        if (!resp.ok) {
            const error = await resp.text()
            const err = new Error(error || resp.statusText);
            err.name = resp.statusText;
            throw err;
        }
        const meData = await resp.json();
        if (isUUIDNil(meData.id)) {
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
