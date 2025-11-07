import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getCohorts } from "../get-cohorts";
import { Cohort } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getCohorts", () => {
    const mockCohorts: Cohort[] = [
        {
            id: "1",
            school_id: "school1",
            year_group_id: "year1",
            name: "Cohort 1",
            description: "Description for Cohort 1",
        },
        {
            id: "2",
            school_id: "school2",
            year_group_id: "year2",
            name: "Cohort 2",
            description: "Description for Cohort 2",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockCohorts) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getCohorts();

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/cohorts" });
    });

    it("returns parsed cohorts data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockCohorts) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getCohorts();
        expect(result).toEqual(mockCohorts);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getCohorts()).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getCohorts()).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockCohorts);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getCohorts();
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
