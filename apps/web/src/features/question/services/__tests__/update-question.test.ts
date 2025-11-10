import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { updateQuestion } from "../update-question";
import { Question } from "../../types";

// Mock authenticatedPut module
jest.mock("@/features/auth/utils/authenticated-put");

describe("updateQuestion", () => {
    const mockedData: Question = {
        id: "1",
        topic_id: "topic-1",
        marks: 5,
        description: "What is 2 + 2?",
        question_type: "MCQ",
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedPut with the correct URI and body data", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedPut as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await updateQuestion(mockedData);
        expect(authenticatedPut).toHaveBeenCalledTimes(1);
        expect(authenticatedPut).toHaveBeenCalledWith({
            uri: "/questions",
            body: mockedData
        });
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedPut rejects", async () => {
        (authenticatedPut as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(updateQuestion(mockedData)).rejects.toThrow("Auth failed");
    });
});
