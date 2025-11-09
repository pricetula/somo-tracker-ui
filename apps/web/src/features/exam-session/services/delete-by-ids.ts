import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";

export async function deleteByIDs(ids: string[]): Promise<void> {
    if (ids.length === 0) throw new Error("ids required to delete exam sessions")
    await authenticatedDelete({ uri: "/exam-session", body: { ids } })
}
