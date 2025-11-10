import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getExamQuestionsByExamID } from "../get-by-exam-id";
import { ExamQuestion } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getExamQuestionsByExamID", () => {
    const mockedData: ExamQuestion[] = [
        {
            exam_id: "exam-1",
            question_id: "question-1",
            question_order: 1,
        },
        {
            exam_id: "exam-1",
            question_id: "question-1",
            question_order: 1,
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getExamQuestionsByExamID("exam-1");

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/exam-questions/exam-1" });
    });

    it("returns parsed exam-questions data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getExamQuestionsByExamID("exam-1");
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getExamQuestionsByExamID("exam-1")).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getExamQuestionsByExamID("exam-1")).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockedData);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getExamQuestionsByExamID("exam-1");
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
