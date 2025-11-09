import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addExams } from "../add-exam";
import { Exam, ExamInput } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addExamsByIDs", () => {
    const mockedExams: ExamInput[] = [
        {
            year_group_id: "year-group-1",
            subject_id: "subject-1",
            name: "name",
            max_marks: 100,
            description: "description",
            instructions: "instructions",
        },
        {
            year_group_id: "year-group-1",
            subject_id: "subject-1",
            name: "name",
            max_marks: 100,
            description: "description",
            instructions: "instructions",
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedPost called without exam details", async () => {
        await expect(addExams([])).rejects.toThrow("exam details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const mockedOutput: Exam[] = mockedExams.map((i) => ({ id: i.subject_id, institute_id: "institute-1", ...i }))
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addExams(mockedExams);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/exams",
            body: mockedExams
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addExams(mockedExams)).rejects.toThrow("Auth failed");
    });
});
