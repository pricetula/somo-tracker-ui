import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";
import { deleteBySchoolIDs } from "../delete-by-school-ids";

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete");

describe("deleteBySchoolIDs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteBySchoolIDs([])).rejects.toThrow("ids required to delete exam session");
    });

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        const ids = ["test-id-1", "test-id-2"]
        await deleteBySchoolIDs(ids);
        expect(authenticatedDelete).toHaveBeenCalledTimes(1);
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/guardian-student",
            body: { ids }
        });
    });

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(deleteBySchoolIDs(["test-id-1"])).rejects.toThrow("Auth failed");
    });
});
