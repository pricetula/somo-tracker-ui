import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getExams } from "../get-by-institute-id";
import { Exam } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getExams", () => {
    const mockedExams: Exam[] = [
        {
            id: "exam-1",
            institute_id: "institute-1",
            year_group_id: "year-group-1",
            subject_id: "subject-1",
            name: "name",
            max_marks: 100,
            description: "description",
            instructions: "instructions",
        },
        {
            id: "exam-1",
            institute_id: "institute-1",
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

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedExams) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getExams();

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/exams" });
    });

    it("returns parsed exams data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedExams) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getExams();
        expect(result).toEqual(mockedExams);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getExams()).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getExams()).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockedExams);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getExams();
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
