import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { isUUIDNil } from "@/shared/utils/is-uuid-nil";
import { Cohort } from "../types";

export async function getCohorts(): Promise<Cohort[] | null> {
    try {
        const resp = await authenticatedGet({ uri: "/cohorts" })
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
