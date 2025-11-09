import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { updateCohort } from "../update-answer";
import { Answer } from "../../types";

// Mock authenticatedPut module
jest.mock("@/features/auth/utils/authenticated-put");

describe("updateCohort", () => {
    const mockedAnswer: Answer = {
        id: "answer-1",
        question_id: "question-1",
        answer_order: 1,
        is_correct: true,
        description: "school description",
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedPut with the correct URI and body data", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedAnswer) };
        (authenticatedPut as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await updateCohort(mockedAnswer);
        expect(authenticatedPut).toHaveBeenCalledTimes(1);
        expect(authenticatedPut).toHaveBeenCalledWith({
            uri: "/answers",
            body: mockedAnswer
        });
        expect(result).toEqual(mockedAnswer);
    });

    it("throws if authenticatedPut rejects", async () => {
        (authenticatedPut as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(updateCohort(mockedAnswer)).rejects.toThrow("Auth failed");
    });
});
