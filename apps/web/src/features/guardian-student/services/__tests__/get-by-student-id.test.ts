import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { getGuardianStudentsByStudentID } from "../get-by-student-id";
import { GuardianStudent } from "../../types";

// Mock authenticatedGet module
jest.mock("@/features/auth/utils/authenticated-get");

describe("getGuardianStudentsByStudentID", () => {
    const mockedData: GuardianStudent[] = [
        {
            school_id: "school1",
            student_id: "student1",
            guardian_id: "guardian1"
        },
        {
            school_id: "school2",
            student_id: "student2",
            guardian_id: "guardian2"
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedGet with the correct URI", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getGuardianStudentsByStudentID("exam-1");

        expect(authenticatedGet).toHaveBeenCalledTimes(1);
        expect(authenticatedGet).toHaveBeenCalledWith({ uri: "/guardian-student/student/exam-1" });
    });

    it("returns parsed guardian-student data from the response", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getGuardianStudentsByStudentID("exam-1");
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedGet rejects", async () => {
        (authenticatedGet as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        await expect(getGuardianStudentsByStudentID("exam-1")).rejects.toThrow("Auth failed");
    });

    it("throws if response.json() rejects", async () => {
        const mockResponse = { json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")) };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await expect(getGuardianStudentsByStudentID("exam-1")).rejects.toThrow("Invalid JSON");
    });

    it("calls response.json() exactly once", async () => {
        const mockJson = jest.fn().mockResolvedValueOnce(mockedData);
        const mockResponse = { json: mockJson };
        (authenticatedGet as jest.Mock).mockResolvedValueOnce(mockResponse);

        await getGuardianStudentsByStudentID("exam-1");
        expect(mockJson).toHaveBeenCalledTimes(1);
    });
});
