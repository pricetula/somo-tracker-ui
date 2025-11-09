import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getCohorts } from "../get-by-question-id";
import { Answer } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getCohorts", () => {
    const mockCohorts: Answer[] = [
        {
            id: "answer-1",
            question_id: "question-1",
            answer_order: 1,
            is_correct: true,
            description: "school description",
        },
        {
            id: "answer-1",
            question_id: "question-2",
            answer_order: 1,
            is_correct: true,
            description: "school description",
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockCohorts) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getCohorts();

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/answers" });
    });

    it("returns parsed answers data from the response", async () => {
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
