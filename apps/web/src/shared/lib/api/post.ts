import { ApiInput } from "./types";
import { buildHeaders, getApiUrl } from "./utils";

export function postApi({ uri, body, token, customHeaders }: ApiInput): Promise<Response> {
    const url = getApiUrl(uri);
    const headers = buildHeaders(token, customHeaders);
    return fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
}