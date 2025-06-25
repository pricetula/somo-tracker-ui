import { jwtDecode } from "jwt-decode"
import { CreateInstitute } from "@/feature/onboarding/create-institute/CreateInstitute";
import { getAccessToken, getAuthData } from "@/lib/auth"
import { Institute } from "@/types/institute";

export default async function Page() {
    let tokenPayload = {
        email: "",
        picture: "",
    }
    const authData = await getAuthData()
    if (authData?.id_token) {
        const decoded = jwtDecode<{
            email: string;
            picture: string;
        }>(authData.id_token)
        tokenPayload = {
            email: decoded.email,
            picture: decoded.picture,
        }
    }

    async function createInstitute(i: Institute) {
        "use server";
        try {
            const body = JSON.stringify(i)
            const accessToken = await getAccessToken()
            const res = await fetch(`${process.env.API_URL}institutes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body,
            });

            if (!res.ok) {
                const err = await res.text();
                return { success: false, data: null, error: err || res.statusText };
            }

            const data = await res.json();

            return { success: true, data, error: "" };
        } catch (err: any) {
            console.error(err)
            return { success: false, data: null, error: err.message };
        }
    }

    return (
        <CreateInstitute createInstitute={createInstitute} tokenPayload={tokenPayload} />
    )
}
