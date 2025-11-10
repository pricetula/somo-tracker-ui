import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";
import { deleteByIDs } from "../delete-by-ids";

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete");

describe("deleteByIDs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteByIDs([])).rejects.toThrow("ids required to delete exam session");
    });

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        const ids = ["test-id-1", "test-id-2"]
        await deleteByIDs(ids);
        expect(authenticatedDelete).toHaveBeenCalledTimes(1);
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/grade-range",
            body: { ids }
        });
    });

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(deleteByIDs(["test-id-1"])).rejects.toThrow("Auth failed");
    });
});
