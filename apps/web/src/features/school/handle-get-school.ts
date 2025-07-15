"use server"

import { redirect } from "next/navigation";
import { getSchools } from "./get-school";
import { School } from "./types";

export async function handleGetSchools(): Promise<School[]> {
    const schools = await getSchools();
    if (!schools?.length) {
        redirect("/onboarding/create-school");
    }
    return schools;
}