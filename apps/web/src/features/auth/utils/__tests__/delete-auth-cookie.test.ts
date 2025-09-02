import { deleteAuthCookie } from "../delete-auth-cookie";
import { cookies } from "next/headers";
import { COOKIE } from "@/shared/lib/constants";

// Mocking next/headers
jest.mock("next/headers", () => ({
    cookies: jest.fn(),
}));

describe("deleteAuthCookie", () => {
    const mockCookies = cookies as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call the delete function with the correct parameters", async () => {
        const deleteMock = jest.fn();
        mockCookies.mockReturnValue({
            delete: deleteMock,
        });

        await deleteAuthCookie();

        expect(deleteMock).toHaveBeenCalledWith({
            name: COOKIE.AUTH,
            path: '/',
        });
    });
});
