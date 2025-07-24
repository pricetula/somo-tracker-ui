import "server-only";

import { cookies } from "next/headers";
import { COOKIE } from "@/shared/lib/constants";

/**
 * Deletes the "auth" cookie.
 * This function should only be called on the server.
 */
export async function deleteAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete({
        name: COOKIE.AUTH,
        path: '/',
    });
}