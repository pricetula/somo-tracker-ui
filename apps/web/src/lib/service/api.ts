function getApiUrl(uri: string): string {
    const cleaneduri = uri.startsWith('/') ? uri.slice(1) : uri
    return `${process.env.API_URL}${cleaneduri}`
}

function buildHeaders(token?: string, customHeaders?: HeadersInit): HeadersInit {
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
    };
}

export function getApi(uri: string, token?: string, customHeaders?: HeadersInit): Promise<Response> {
    const url = getApiUrl(uri);
    const headers = buildHeaders(token, customHeaders);
    return fetch(url, { method: 'GET', headers });
}

export function postApi(uri: string, body: any, token?: string, customHeaders?: HeadersInit): Promise<Response> {
    const url = getApiUrl(uri);
    const headers = buildHeaders(token, customHeaders);
    return fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
}

export function putApi(uri: string, body: any, token?: string, customHeaders?: HeadersInit): Promise<Response> {
    const url = getApiUrl(uri);
    const headers = buildHeaders(token, customHeaders);
    return fetch(url, { method: 'PUT', headers, body: JSON.stringify(body) });
}

export function deleteApi(uri: string, token?: string, customHeaders?: HeadersInit): Promise<Response> {
    const url = getApiUrl(uri);
    const headers = buildHeaders(token, customHeaders);
    return fetch(url, { method: 'DELETE', headers });
}