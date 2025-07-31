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
        return await resp.json();
    } catch (error: any) {
        if (error.message?.includes("sql: no rows")) {
            return null
        }
        throw error;
    }
}
