import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getQuestionsByTopicID } from "../get-by-topic-id";
import { Question } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getQuestionsByTopicID", () => {
    const mockedData: Question[] = [
        {
            id: "1",
            topic_id: "topic-1",
            marks: 5,
            description: "What is 2 + 2?",
            question_type: "MCQ",
        },
        {
            id: "2",
            topic_id: "topic-1",
            marks: 5,
            description: "What is 2 + 2?",
            question_type: "MCQ",
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getQuestionsByTopicID("exam-1");

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/questions/topic/exam-1" });
    });

    it("returns parsed questions data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getQuestionsByTopicID("exam-1");
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getQuestionsByTopicID("exam-1")).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getQuestionsByTopicID("exam-1")).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockedData);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getQuestionsByTopicID("exam-1");
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
