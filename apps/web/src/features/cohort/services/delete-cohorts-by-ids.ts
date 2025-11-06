import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";

export async function deleteCohortsByIDs(ids: string[]): Promise<void> {
    if (ids.length === 0) throw new Error("ids required to delete cohorts")
    await authenticatedDelete({ uri: "/cohorts", body: { ids } })
}
