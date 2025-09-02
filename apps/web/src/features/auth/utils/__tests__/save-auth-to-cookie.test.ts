import { saveAuthToCookie } from "../save-auth-to-cookie";
import { cookies } from "next/headers";
import { COOKIE } from "@/shared/lib/constants";
import { SaveAuthToCookieError } from "../../errors";
import { AuthCookie } from "../../types";

// Mocking next/headers
jest.mock("next/headers", () => ({
    cookies: jest.fn(),
}));

describe("saveAuthToCookie", () => {
    const mockCookies = cookies as jest.Mock;
    const setMock = jest.fn();

    beforeEach(() => {
        mockCookies.mockReturnValue({
            set: setMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should throw an error if data is null", async () => {
        await expect(saveAuthToCookie(null as any)).rejects.toThrow(
            new SaveAuthToCookieError("No data found in refresh token response")
        );
    });

    it("should throw an error if access_token is missing", async () => {
        const data = { refresh_token: "rt", id_token: "it" } as AuthCookie;
        await expect(saveAuthToCookie(data)).rejects.toThrow(
            new SaveAuthToCookieError("No access token found in refresh token response")
        );
    });

    it("should throw an error if refresh_token is missing", async () => {
        const data = { access_token: "at", id_token: "it" } as AuthCookie;
        await expect(saveAuthToCookie(data)).rejects.toThrow(
            new SaveAuthToCookieError("No refresh token found in refresh token response")
        );
    });

    it("should throw an error if id_token is missing", async () => {
        const data = { access_token: "at", refresh_token: "rt" } as AuthCookie;
        await expect(saveAuthToCookie(data)).rejects.toThrow(
            new SaveAuthToCookieError("No id token found in refresh token response")
        );
    });

    it("should call the set function with the correct parameters", async () => {
        const data: AuthCookie = {
            access_token: "at",
            refresh_token: "rt",
            id_token: "it",
            token_type: "Bearer",
            expires_in: 3600,
        };

        await saveAuthToCookie(data);

        expect(setMock).toHaveBeenCalledWith(
            COOKIE.AUTH,
            JSON.stringify({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                id_token: data.id_token,
                token_type: data.token_type,
                expires_in: data.expires_in,
            }),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: COOKIE.MAX_AGE,
                path: '/'
            }
        );
    });
});
