import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addGradeRanges } from "../add-grade-ranges";
import { GradeRangeInput } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addGradeRanges", () => {
    const mockedData: GradeRangeInput[] = [
        {
            min_percentage: 50,
            max_percentage: 60,
            grade_range_group: "group1",
            name: "Pass",
            description: "Passing grade",
            grade_order: 1
        },
        {
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

    it("throws if authenticatedPost called without grade-range details", async () => {
        await expect(addGradeRanges([])).rejects.toThrow("grade-range details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const mockedOutput: GradeRangeInput[] = mockedData.map((i) => ({ id: "test-id", ...i }))
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addGradeRanges(mockedData);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/grade-range",
            body: mockedData
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addGradeRanges(mockedData)).rejects.toThrow("Auth failed");
    });
});
