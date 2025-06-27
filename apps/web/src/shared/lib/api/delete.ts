import { ApiInput } from "./types";
import { buildHeaders, getApiUrl } from "./utils";

export function deleteApi({ uri, token, customHeaders }: ApiInput): Promise<Response> {
    const url = getApiUrl(uri);
    const headers = buildHeaders(token, customHeaders);
    return fetch(url, { method: 'DELETE', headers });
}