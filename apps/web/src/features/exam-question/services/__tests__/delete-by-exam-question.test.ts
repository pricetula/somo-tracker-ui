import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";
import { deleteByExamQuestions } from "../delete-by-exam-question";
import { ExamQuestionID } from "../../types";

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete");

describe("deleteByIDs", () => {
    const mockedData: ExamQuestionID[] = [
        {
            exam_id: "exam-1",
            question_id: "question-1",
        },
        {
            exam_id: "exam-1",
            question_id: "question-1",
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteByExamQuestions([])).rejects.toThrow("ids required to delete exam-questions");
    });

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        await deleteByExamQuestions(mockedData);
        expect(authenticatedDelete).toHaveBeenCalledTimes(1);
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/exam-questions",
            body: mockedData,
        });
    });

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(deleteByExamQuestions(mockedData)).rejects.toThrow("Auth failed");
    });
});
