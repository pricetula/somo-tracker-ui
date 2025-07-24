import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { InstituteUser } from "../types";

export async function getMe(): Promise<InstituteUser> {
    const resp = await authenticatedGet({ uri: "/me" })
    if (!resp.ok) {
        const error = await resp.text()

        const err = new Error(error || resp.statusText);

        err.name = resp.statusText;

        throw err;
    }
    return await resp.json();
}
