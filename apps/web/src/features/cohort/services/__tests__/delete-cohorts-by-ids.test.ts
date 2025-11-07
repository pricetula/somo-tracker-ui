import { authenticatedDelete } from "@/features/auth/utils/authenticated-delete";
import { deleteCohortsByIDs } from "../delete-cohorts-by-ids";

// Mock authenticatedDelete module
jest.mock("@/features/auth/utils/authenticated-delete");

describe("deleteCohortsByIDs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("throws if authenticatedDelete called without ids", async () => {
        await expect(deleteCohortsByIDs([])).rejects.toThrow("ids required to delete cohorts");
    });

    it("calls authenticatedDelete with the correct URI and body data", async () => {
        const ids = ["test-id-1", "test-id-2"]
        await deleteCohortsByIDs(ids);
        expect(authenticatedDelete).toHaveBeenCalledTimes(1);
        expect(authenticatedDelete).toHaveBeenCalledWith({
            uri: "/cohorts",
            body: { ids }
        });
    });

    it("throws if authenticatedDelete rejects", async () => {
        (authenticatedDelete as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));
        await expect(deleteCohortsByIDs(["test-id-1"])).rejects.toThrow("Auth failed");
    });
});
