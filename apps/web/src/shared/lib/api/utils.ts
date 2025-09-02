export function getApiUrl(uri: string): string {
    if (!process.env.API_URL) {
        throw new Error('API_URL is not defined');
    }
    const cleaneduri = uri.startsWith('/') ? uri.slice(1) : uri
    return `${process.env.API_URL}${cleaneduri}`
}

export function buildHeaders(token?: string, customHeaders?: HeadersInit): HeadersInit {
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
    };
}