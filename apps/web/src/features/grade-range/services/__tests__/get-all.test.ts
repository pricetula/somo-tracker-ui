import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getAll } from "../get-all";
import { GradeRange } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getAll", () => {
    const mockedData: GradeRange[] = [
        {
            id: "test-id",
            min_percentage: 50,
            max_percentage: 60,
            grade_range_group: "group1",
            name: "Pass",
            description: "Passing grade",
            grade_order: 1
        },
        {
            id: "test-id",
            min_percentage: 50,
            max_percentage: 60,
            grade_range_group: "group1",
            name: "Pass",
            description: "Passing grade",
            grade_order: 1
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getAll();

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/grade-range" });
    });

    it("returns parsed grade-range data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getAll();
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getAll()).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getAll()).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockedData);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getAll();
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
