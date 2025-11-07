import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addCohortFaculties } from "../add-cohort-faculties";
import { CohortFaculty } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addCohortFacultiesByIDs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedPost called without cohort faculties", async () => {
        await expect(addCohortFaculties([])).rejects.toThrow("cohort faculties required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
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
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(input) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addCohortFaculties(input);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/cohort-faculties",
            body: input
        });
        expect(result).toEqual(input);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addCohortFaculties([
            {
                cohort_id: "school-id-1",
                user_id: "year-group-id-1",
                assigned_at: "2025-11-07T21:48:47.996Z",
            }
        ])).rejects.toThrow("Auth failed");
    });
});
