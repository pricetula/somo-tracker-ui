import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete"
import { deleteCohortStudentsByUserIDs } from "../delete-cohort-students-by-user-ids"

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete")

describe("deleteCohortStudentsByUserIDs", () => {
    const ids = [
        "id-1",
        "id-2",
    ]

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteCohortStudentsByUserIDs([])).rejects.toThrow("user ids required to delete cohort students")
    })

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        await deleteCohortStudentsByUserIDs(ids)
        expect(authenticatedDelete).toHaveBeenCalledTimes(1)
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/cohort-students/users",
            body: { ids }
        })
    })

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"))
        await expect(deleteCohortStudentsByUserIDs(ids)).rejects.toThrow("Auth failed")
    })
})
