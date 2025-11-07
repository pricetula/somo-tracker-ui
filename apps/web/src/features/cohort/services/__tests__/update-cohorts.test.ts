import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { updateCohort } from "../update-cohort";
import { Cohort } from "../../types";

// Mock authenticatedPut module
jest.mock("@/features/auth/utils/authenticated-put");

describe("updateCohort", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedPut with the correct URI and body data", async () => {
        const input: Cohort = {
            id: "test-id",
            school_id: "school-id-1",
            year_group_id: "year-group-id",
            name: "school name",
            description: "school description",
        }
        const mockedOutput: Cohort = input
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPut as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await updateCohort(input);
        expect(authenticatedPut).toHaveBeenCalledTimes(1);
        expect(authenticatedPut).toHaveBeenCalledWith({
            uri: "/cohorts",
            body: input
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPut rejects", async () => {
        (authenticatedPut as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(updateCohort({
            id: "test-id",
            school_id: "school-id-1",
            year_group_id: "year-group-id",
            name: "school name",
            description: "school description",
        })).rejects.toThrow("Auth failed");
    });
});
