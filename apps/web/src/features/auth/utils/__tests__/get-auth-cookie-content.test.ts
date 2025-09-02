import { getAuthCookieContent } from "../get-auth-cookie-content";
import { cookies } from "next/headers";
import { COOKIE } from "@/shared/lib/constants";

// Mocking next/headers
jest.mock("next/headers", () => ({
    cookies: jest.fn(),
}));

describe("getAuthCookieContent", () => {
    const mockCookies = cookies as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return null if auth cookie is not present", async () => {
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue(null),
        });

        const result = await getAuthCookieContent();
        expect(result).toBeNull();
    });

    it("should return null if auth cookie has no value", async () => {
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: "" }),
        });

        const result = await getAuthCookieContent();
        expect(result).toBeNull();
    });

    it("should throw an error if auth cookie has invalid JSON value", async () => {
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: "invalid-json" }),
        });

        await expect(getAuthCookieContent()).rejects.toThrow(
            "Failed to get auth cookie content: Unexpected token 'i', \"invalid-json\" is not valid JSON"
        );
    });

    it("should throw an error if id_token is missing", async () => {
        const cookieValue = JSON.stringify({ access_token: "some-access-token" });
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: cookieValue }),
        });

        await expect(getAuthCookieContent()).rejects.toThrow(
            "Failed to get auth cookie content: Auth cookie content is missing expected tokens."
        );
    });

    it("should throw an error if access_token is missing", async () => {
        const cookieValue = JSON.stringify({ id_token: "some-id-token" });
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: cookieValue }),
        });

        await expect(getAuthCookieContent()).rejects.toThrow(
            "Failed to get auth cookie content: Auth cookie content is missing expected tokens."
        );
    });

    it("should return the parsed cookie content if the cookie is valid", async () => {
        const expectedContent = {
            id_token: "some-id-token",
            access_token: "some-access-token",
        };
        const cookieValue = JSON.stringify(expectedContent);
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: cookieValue }),
        });

        const result = await getAuthCookieContent();
        expect(result).toEqual(expectedContent);
    });
});
