import { QueryClient } from '@tanstack/react-query';

// Global single instance of QueryClient (used for both server and client)
let client: QueryClient | undefined = undefined;

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // 5 mins for cache to be stale after
                staleTime: 5 * 60 * 1000,
                // garbage collect after 10 mins
                gcTime: 10 * 60 * 1000,
                refetchOnWindowFocus: false,
                retry: (failureCount, error: any) => {
                    // don't retry if unauthorized
                    if (error?.status === 401) return false;
                    // if failureCount is below 3 then allow a retry on query
                    return failureCount < 3;
                },
            },
        },
    });
}

export function makeQueryClient() {
    if (typeof window === 'undefined') {
        // Server: Always create a new QueryClient to avoid sharing state between requests
        return createQueryClient();
    }

    // Client: Create the QueryClient on first render and reuse it
    if (!client) {
        client = createQueryClient();
    }

    return client;
}