import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete"
import { deleteCohortStudentsByCohortIDs } from "../delete-cohort-students-by-cohort-ids"

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete")

describe("deleteCohortStudentsByCohortIDs", () => {
    const ids = [
        "id-1",
        "id-2",
    ]

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteCohortStudentsByCohortIDs([])).rejects.toThrow("cohort ids required to delete cohort students")
    })

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        await deleteCohortStudentsByCohortIDs(ids)
        expect(authenticatedDelete).toHaveBeenCalledTimes(1)
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/cohort-students/cohorts",
            body: { ids }
        })
    })

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"))
        await expect(deleteCohortStudentsByCohortIDs(ids)).rejects.toThrow("Auth failed")
    })
})
