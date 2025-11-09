import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addAnswers } from "../add-answers";
import { Answer, AnswerInput } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addAnswersByIDs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedPost called without answer details", async () => {
        await expect(addAnswers([])).rejects.toThrow("answer details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const input: AnswerInput[] = [
            {
                question_id: "question-1",
                answer_order: 1,
                is_correct: true,
                description: "school description",
            },
            {
                question_id: "question-2",
                answer_order: 1,
                is_correct: true,
                description: "school description",
            }
        ]
        const mockedOutput: Answer[] = input.map((i) => ({ id: i.question_id, ...i }))
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addAnswers(input);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/answers",
            body: input
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addAnswers([
            {
                question_id: "question-1",
                answer_order: 1,
                is_correct: true,
                description: "school description",
            }
        ])).rejects.toThrow("Auth failed");
    });
});
