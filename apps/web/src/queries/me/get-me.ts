/**
 * Fetches curated photos from the Pexels API for a specific page number.
 *
 * @param {string} token - The access token for authentication.
 * @returns {Promise<InstituteUser>} - A promise that resolves to an InstituteUser object.
 * @throws {Error} If the request fails or the response is not OK.
 *
 * @example
 * getMe(token_string)
 */
export async function getMe(token: string): Promise<any> {
    if (!token?.length) {
        throw new Error("No token provided")
    }

    token = token.trim()

    if (!process.env.API_URL) {
        throw new Error("No API_URL provided")
    }

    const response = await fetch(`${process.env.API_URL}me`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`)
    }

    return await response.json()
}