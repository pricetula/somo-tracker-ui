import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addExamSessions } from "../add-exam-session";
import { ExamSessionInput } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addExamSessionsByIDs", () => {
    const mockedData: ExamSessionInput[] = [
        {
            exam_id: "exam-1",
            date: "2023-10-10",
            start_time: "10:00",
            end_time: "12:00",
        },
        {
            exam_id: "exam-1",
            date: "2023-10-10",
            start_time: "10:00",
            end_time: "12:00",
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedPost called without exam-session details", async () => {
        await expect(addExamSessions([])).rejects.toThrow("exam-session details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const mockedOutput: ExamSessionInput[] = mockedData.map((i) => ({ id: i.exam_id, ...i }))
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addExamSessions(mockedData);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/exam-session",
            body: mockedData
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addExamSessions(mockedData)).rejects.toThrow("Auth failed");
    });
});
