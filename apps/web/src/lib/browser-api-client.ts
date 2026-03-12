/**
 * Client-safe fetch client for React Query queryFn.
 * Routes requests through the Next.js proxy at /api/proxy,
 * which handles auth cookie forwarding server-side.
 */
export async function browserApiClient(path: string): Promise<Response> {
    return fetch(`/api/proxy${path}`, {
        headers: { "Content-Type": "application/json" },
    });
}
