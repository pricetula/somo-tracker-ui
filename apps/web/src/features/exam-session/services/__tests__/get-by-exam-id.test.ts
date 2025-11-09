import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getExamSessionsByExamID } from "../get-by-exam-id";
import { ExamSession } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getExamSessionsByExamID", () => {
    const mockedData: ExamSession[] = [
        {
            id: "session-1",
            exam_id: "exam-1",
            date: "2023-10-10",
            start_time: "10:00",
            end_time: "12:00",
        },
        {
            id: "session-2",
            exam_id: "exam-1",
            date: "2023-10-10",
            start_time: "10:00",
            end_time: "12:00",
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getExamSessionsByExamID("exam-1");

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/exam-session/exam-1" });
    });

    it("returns parsed exam-session data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getExamSessionsByExamID("exam-1");
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getExamSessionsByExamID("exam-1")).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getExamSessionsByExamID("exam-1")).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockedData);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getExamSessionsByExamID("exam-1");
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
