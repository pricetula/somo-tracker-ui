"use server";
import { postApi } from "@/shared/lib/api";
import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { ActionResponse } from "@/shared/types/actions";
import { School } from "../types";
import { CreateSchoolSchema } from "./form-schema";

export async function createSchool(i: CreateSchoolSchema): Promise<ActionResponse<School | null>> {
    try {
        const token = await getAccessTokenFromAuthCookie();
        const resp = await postApi({
            token,
            body: i,
            uri: "/schools",
        })
        const data = await resp.json();
        if (!resp.ok) {
            return {
                success: false,
                data: null,
                error: data.error || "Failed to create school",
            };
        }
        return { success: true, data, error: "" };
    } catch (err: any) {
        return { success: false, data: null, error: err.message || "Network/server error" };
    }
}