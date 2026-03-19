import { cookies } from "next/headers";

type RequestOptions = Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
};

export async function apiClient(path: string, options: RequestOptions = {}): Promise<Response> {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
        throw new Error("BACKEND_URL is not configured.");
    }

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        credentials: "include",
        ...options.headers,
    };

    if (sessionToken) {
        headers["Cookie"] = `session_token=${sessionToken}`;
    }

    return fetch(`${backendUrl}${path}`, { ...options, headers });
}
