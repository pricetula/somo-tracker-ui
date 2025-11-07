import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getCohortStudentByCohortID } from "../get-cohort-student-by-cohort-id";
import { CohortStudent } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getCohortStudentByCohortID", () => {
    const mockCohorts: CohortStudent[] = [
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

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockCohorts) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getCohortStudentByCohortID("test-id")

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/cohort-students/test-id" });
    });

    it("returns parsed cohorts data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockCohorts) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getCohortStudentByCohortID("test-id");
        expect(result).toEqual(mockCohorts);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getCohortStudentByCohortID("test-id")).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getCohortStudentByCohortID("test-id")).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockCohorts);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getCohortStudentByCohortID("test-id");
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
