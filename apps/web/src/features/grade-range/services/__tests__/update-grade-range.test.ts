import { authenticatedPut } from "@/features/auth/utils/authenticated-put";
import { updateGradeRange } from "../update-grade-range";
import { GradeRange } from "../../types";

// Mock authenticatedPut module
jest.mock("@/features/auth/utils/authenticated-put");

describe("updateGradeRange", () => {
    const mockedData: GradeRange = {
        id: "session-2",
        exam_id: "exam-1",
        date: "2023-10-10",
        start_time: "10:00",
        end_time: "12:00",
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls authenticatedPut with the correct URI and body data", async () => {
        const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockedData) };
        (authenticatedPut as jest.Mock).mockResolvedValueOnce(mockResponse);
        const result = await updateGradeRange(mockedData);
        expect(authenticatedPut).toHaveBeenCalledTimes(1);
        expect(authenticatedPut).toHaveBeenCalledWith({
            uri: "/grade-range",
            body: mockedData
        });
        expect(result).toEqual(mockedData);
    });

    it("throws if authenticatedPut rejects", async () => {
        (authenticatedPut as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(updateGradeRange(mockedData)).rejects.toThrow("Auth failed");
    });
});
