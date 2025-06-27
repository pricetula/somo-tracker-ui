import { Institute } from "@/features/institutes/types";
import { createInstituteFn } from "./create-institute";

/**
 * Creates a new institute.
 *
 * @param i The institute to create.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function createInstitute(i: Institute): Promise<{
    success: boolean;
    data: any;
    error: string;
}> {
    "use server";
    try {
        const data = await createInstituteFn(i)
        return { success: true, data, error: "" };
    } catch (err: any) {
        return { success: false, data: "", error: err.message || "Network/server error" };
    }
}