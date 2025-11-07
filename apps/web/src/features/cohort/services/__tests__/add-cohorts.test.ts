import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addCohorts } from "../add-cohorts";
import { Cohort, CohortInput } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addCohortsByIDs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedPost called without cohort details", async () => {
        await expect(addCohorts([])).rejects.toThrow("cohort details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const input: CohortInput[] = [
            {
                school_id: "school-id-1",
                year_group_id: "year-group-id",
                name: "school name",
                description: "school description",
            },
            {
                school_id: "school-id-2",
                year_group_id: "year-group-id",
                name: "school name",
                description: "school description",
            }
        ]
        const mockedOutput: Cohort[] = input.map((i) => ({ id: i.school_id, ...i }))
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addCohorts(input);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/cohorts",
            body: input
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addCohorts([
            {
                school_id: "school-id-1",
                year_group_id: "year-group-id",
                name: "school name",
                description: "school description",
            }
        ])).rejects.toThrow("Auth failed");
    });
});
