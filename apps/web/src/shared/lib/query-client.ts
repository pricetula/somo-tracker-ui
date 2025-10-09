import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
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