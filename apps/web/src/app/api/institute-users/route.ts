import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { getApi } from "@/shared/lib/api";

export async function GET(request: NextRequest) {
    try {
        const reqUrl = new URL(request.url);

        // 1. Input Validation and Sanitization
        // Use a robust validation library like 'zod' for schema validation
        // For simplicity, basic validation is shown here.
        const roles = reqUrl.searchParams.get("roles");
        const limitParam = reqUrl.searchParams.get("limit");
        const lastSeenCreatedAtParam = reqUrl.searchParams.get("last_seen_created_at");

        let limit: number | undefined;
        if (limitParam) {
            const parsedLimit = parseInt(limitParam, 10);
            if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 100) { // Example: max limit 100
                return new NextResponse(
                    JSON.stringify({ message: "Invalid 'limit' parameter. Must be a positive number up to 100." }),
                    { status: 400 }
                );
            }
            limit = parsedLimit;
        }

        let last_seen_created_at: string | undefined;
        if (lastSeenCreatedAtParam) {
            // Basic ISO 8601 validation. More robust validation might be needed depending on format.
            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(lastSeenCreatedAtParam)) {
                return new NextResponse(
                    JSON.stringify({ message: "Invalid 'last_seen_created_at' parameter. Must be a valid ISO 8601 string." }),
                    { status: 400 }
                );
            }
            last_seen_created_at = lastSeenCreatedAtParam;
        }

        // Constructing the URI
        const queryParams: string[] = [];
        if (roles) {
            // Further validation/sanitization for 'roles' might be needed (e.g., allow-list of roles)
            queryParams.push(`roles=${encodeURIComponent(roles)}`);
        }
        if (limit !== undefined) {
            queryParams.push(`limit=${limit}`);
        }
        if (last_seen_created_at) {
            queryParams.push(`last_seen_created_at=${encodeURIComponent(last_seen_created_at)}`);
        }

        let uri = "/institute-users";
        if (queryParams.length > 0) {
            uri += `?${queryParams.join("&")}`;
        }

        // 2. Authentication and Authorization
        const token = await getAccessTokenFromAuthCookie();
        if (!token) {
            // If no token, return 401 Unauthorized
            return new NextResponse(JSON.stringify({ message: "Authentication required." }), { status: 401 });
        }

        const resp = await getApi({ uri, token });

        if (!resp.ok) {
            // 3. Improved Error Handling and Logging (server-side)
            const errorText = await resp.text();
            console.error(`API call failed: ${resp.status} - ${errorText}`);
            return new NextResponse(
                JSON.stringify({ message: errorText || "An unknown error occurred with the upstream API." }),
                { status: resp.status }
            );
        }

        return new NextResponse(JSON.stringify(await resp.json()), { status: 200 });
    } catch (error) {
        // Catch unexpected errors and return a generic error message
        console.error("An unexpected error occurred in GET /api/institute-users:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}