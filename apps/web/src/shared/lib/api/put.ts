import { ApiInput } from "./types";
import { buildHeaders, getApiUrl } from "./utils";

export function putApi({ uri, body, token, customHeaders }: ApiInput): Promise<Response> {
    const url = getApiUrl(uri);
    const headers = buildHeaders(token, customHeaders);
    return fetch(url, { method: 'PUT', headers, body: JSON.stringify(body) });
}