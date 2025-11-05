import { Cohort } from "../types";

export async function getCohortsAPI(): Promise<Cohort[]> {
    // 1. Fetch the internal API endpoint. Relative path is safe in the browser.
    const resp = await fetch("/api/cohorts");
    return resp.json() as Promise<Cohort[]>;
}