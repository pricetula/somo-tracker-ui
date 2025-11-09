import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { updateExamQuestion } from "../update-exam-question";
import { ExamQuestion } from "../../types";

// Mock authenticatedPut module
jest.mock("@/features/auth/utils/authenticated-put");

describe("updateExamQuestion", () => {
    const mockedData: ExamQuestion = {
        exam_id: "exam-1",
        question_id: "question-1",
        question_order: 1,
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedPut with the correct URI and body data", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedPut as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await updateExamQuestion(mockedData);
        expect(authenticatedPut).toHaveBeenCalledTimes(1);
        expect(authenticatedPut).toHaveBeenCalledWith({
            uri: "/exam-questions",
            body: mockedData
        });
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedPut rejects", async () => {
        (authenticatedPut as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(updateExamQuestion(mockedData)).rejects.toThrow("Auth failed");
    });
});
