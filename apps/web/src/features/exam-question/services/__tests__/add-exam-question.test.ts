import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addExamQuestions } from "../add-exam-question";
import { ExamQuestion } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addExamQuestionsByIDs", () => {
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

    it("throws if authenticatedPost called without exam-question details", async () => {
        await expect(addExamQuestions([])).rejects.toThrow("exam-question details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const mockedOutput: ExamQuestion[] = mockedData.map((i) => ({ id: i.question_id, ...i }))
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addExamQuestions(mockedData);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/exam-questions",
            body: mockedData
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addExamQuestions(mockedData)).rejects.toThrow("Auth failed");
    });
});
