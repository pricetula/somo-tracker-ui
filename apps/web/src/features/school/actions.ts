import { createSchoolFn } from "./create-school/create-school";
import { School } from "./types";

/**
 * Creates a new school.
 *
 * @param i The school to create.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function createSchool(i: School): Promise<{
    success: boolean;
    data: any;
    error: string;
}> {
    "use server";
    try {
        const data = await createSchoolFn(i)
        return { success: true, data, error: "" };
    } catch (err: any) {
        return { success: false, data: "", error: err.message || "Network/server error" };
    }
}