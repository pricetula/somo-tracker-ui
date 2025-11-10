import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";

export async function deleteQuestionsByIDs(body: string[]): Promise<void> {
    if (body.length === 0) throw new Error("ids required to delete questions")
    await authenticatedDelete({ uri: "/questions", body })
}
