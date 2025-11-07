import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete"
import { deleteCohortFaculties } from "../delete-cohort-faculties"
import { CohortFaculty } from "../../types"

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete")

describe("deleteCohortFaculties", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteCohortFaculties([])).rejects.toThrow("cohort faculties required to delete")
    })

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        const input: CohortFaculty[] = [
            {
                cohort_id: "school-id-1",
                user_id: "year-group-id-1",
                assigned_at: "2025-11-07T21:48:47.996Z",
            },
            {
                cohort_id: "school-id-2",
                user_id: "year-group-id-2",
                assigned_at: "2025-11-07T21:48:47.996Z",
            }
        ]
        await deleteCohortFaculties(input)
        expect(authenticatedDelete).toHaveBeenCalledTimes(1)
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/cohort-faculties",
            body: input
        })
    })

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"))
        await expect(deleteCohortFaculties([
            {
                cohort_id: "school-id-2",
                user_id: "year-group-id-2",
                assigned_at: "2025-11-07T21:48:47.996Z",
            }
        ])).rejects.toThrow("Auth failed")
    })
})
