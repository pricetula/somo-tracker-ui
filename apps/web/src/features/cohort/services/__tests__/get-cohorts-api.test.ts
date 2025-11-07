import { getCohortsAPI } from "../get-cohorts-api";
import { Cohort } from "../../types";

// mock the global fetch function
global.fetch = jest.fn();

describe("getCohortsAPI", () => {
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

    it("calls the correct API endpoint", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockCohorts),
        });

        await getCohortsAPI();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("/api/cohorts");
    });

    it("returns parsed cohorts data", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockCohorts),
        });

        const result = await getCohortsAPI();
        expect(result).toEqual(mockCohorts);
    });

    it("throws if fetch fails", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        await expect(getCohortsAPI()).rejects.toThrow("Network error");
    });

    it("throws if JSON parsing fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")),
        });

        await expect(getCohortsAPI()).rejects.toThrow("Invalid JSON");
    });
});
