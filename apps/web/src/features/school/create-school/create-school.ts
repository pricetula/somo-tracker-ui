import { postApi } from "@/shared/lib/api";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { School } from "../types";

export async function createSchoolFn(i: School): Promise<School> {
    const token = await getAccessTokenFromAuthCookie();
    const resp = await postApi({
        token,
        body: i,
        uri: "/school",
    })
    return await resp.json();
}