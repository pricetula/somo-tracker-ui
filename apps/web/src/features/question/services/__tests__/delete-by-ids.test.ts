import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";
import { deleteQuestionsByIDs } from "../delete-by-ids";

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete");

describe("deleteByIDs", () => {
    const mockedData = ["question-1", "question-2"]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteQuestionsByIDs([])).rejects.toThrow("ids required to delete questions");
    });

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        await deleteQuestionsByIDs(mockedData);
        expect(authenticatedDelete).toHaveBeenCalledTimes(1);
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/questions",
            body: mockedData,
        });
    });

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(deleteQuestionsByIDs(mockedData)).rejects.toThrow("Auth failed");
    });
});
