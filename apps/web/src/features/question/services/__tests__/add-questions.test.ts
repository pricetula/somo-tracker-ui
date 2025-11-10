import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addQuestions } from "../add-questions";
import { Question, QuestionInput } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addQuestionsByIDs", () => {
    const mockedInputData: QuestionInput[] = [
        {
            topic_id: "topic-1",
            marks: 5,
            description: "What is 2 + 2?",
            question_type: "MCQ",
        },
        {
            topic_id: "topic-1",
            marks: 5,
            description: "What is 2 + 2?",
            question_type: "MCQ",
        }
    ]
    const mockedData = mockedInputData.map((i, index) => ({ id: index + "", ...i }))

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedPost called without question details", async () => {
        await expect(addQuestions([])).rejects.toThrow("question details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addQuestions(mockedInputData);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/questions",
            body: mockedInputData
        });
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addQuestions(mockedData)).rejects.toThrow("Auth failed");
    });
});
