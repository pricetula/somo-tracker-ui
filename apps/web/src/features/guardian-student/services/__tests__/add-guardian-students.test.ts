import { authenticatedPost } from "@/features/auth/utils/authenticated-post";
import { addGuardianStudents } from "../add-guardian-students";
import { GuardianStudent } from "../../types";

// Mock authenticatedPost module
jest.mock("@/features/auth/utils/authenticated-post");

describe("addGradeRangesByIDs", () => {
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

    it("throws if authenticatedPost called without guardian-student details", async () => {
        await expect(addGuardianStudents([])).rejects.toThrow("guardian-student details required to be added");
    });

    it("calls authenticatedPost with the correct URI and body data", async () => {
        const mockedOutput: GuardianStudent[] = mockedData.map((i) => ({ id: "test-id", ...i }))
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedOutput) };
        (authenticatedPost as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await addGuardianStudents(mockedData);
        expect(authenticatedPost).toHaveBeenCalledTimes(1);
        expect(authenticatedPost).toHaveBeenCalledWith({
            uri: "/guardian-student",
            body: mockedData
        });
        expect(result).toEqual(mockedOutput);
    });

    it("throws if authenticatedPost rejects", async () => {
        (authenticatedPost as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(addGuardianStudents(mockedData)).rejects.toThrow("Auth failed");
    });
});
