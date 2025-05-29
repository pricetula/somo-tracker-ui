import { getApi } from "./api";

export async function getMe(token: string): Promise<any> {
    const resp = await getApi("/me", token)
    return await resp.json();
}