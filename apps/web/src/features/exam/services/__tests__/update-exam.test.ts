import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { updateExam } from "../update-exam";
import { Exam } from "../../types";

// Mock authenticatedPut module
jest.mock("@/features/auth/utils/authenticated-put");

describe("updateExam", () => {
    const mockedExam: Exam = {
        id: "exam-1",
        question_id: "question-1",
        exam_order: 1,
        is_correct: true,
        description: "school description",
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedPut with the correct URI and body data", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedExam) };
        (authenticatedPut as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await updateExam(mockedExam);
        expect(authenticatedPut).toHaveBeenCalledTimes(1);
        expect(authenticatedPut).toHaveBeenCalledWith({
            uri: "/exams",
            body: mockedExam
        });
        expect(result).toEqual(mockedExam);
    });

    it("throws if authenticatedPut rejects", async () => {
        (authenticatedPut as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(updateExam(mockedExam)).rejects.toThrow("Auth failed");
    });
});
