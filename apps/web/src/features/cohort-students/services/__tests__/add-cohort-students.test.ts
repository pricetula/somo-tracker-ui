import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addCohortStudents } from "../add-cohort-students";
import { CohortStudent } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addCohortFacultiesByIDs", () => {
    const input: CohortStudent[] = [
        {
            cohort_id: "school-id-1",
            user_id: "year-group-id-1",
            joined_at: "2025-11-07T21:48:47.996Z",
            valid_until: "2025-11-07T21:48:47.996Z",
        },
        {
            cohort_id: "school-id-2",
            user_id: "year-group-id-2",
            joined_at: "2025-11-07T21:48:47.996Z",
            valid_until: "2025-11-07T21:48:47.996Z",
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedPost called without cohort students", async () => {
        await expect(addCohortStudents([])).rejects.toThrow("cohort students required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(input) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addCohortStudents(input);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/cohort-students",
            body: input
        });
        expect(result).toEqual(input);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addCohortStudents(input)).rejects.toThrow("Auth failed");
    });
});
