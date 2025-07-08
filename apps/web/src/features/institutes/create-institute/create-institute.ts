import { postApi } from "@/shared/lib/api";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { Institute } from "@/features/institutes/types";

export async function createInstituteFn(i: Institute): Promise<Institute> {
    const token = await getAccessTokenFromAuthCookie();
    const resp = await postApi({
        token,
        body: i,
        uri: "/institutes",
    })
    return await resp.json();
}