import { authenticatedGet } from "@/features/auth/utils/authenticated-get";
import { Cohort } from "../types";

export async function getCohorts(): Promise<Cohort[] | null> {
    const resp = await authenticatedGet({ uri: "/cohorts" })
    return await resp.json();
}
