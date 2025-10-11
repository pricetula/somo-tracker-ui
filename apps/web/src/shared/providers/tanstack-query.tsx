'use client';

import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from '@/shared/lib/query-client';

export default function TanstackQueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = makeQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Devtools is essential for debugging and monitoring cache state */}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}