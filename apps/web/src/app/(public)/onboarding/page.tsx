import { CreateInstitute } from "@/feature/onboarding/create-institute/CreateInstitute";
import { CreateInstituteSchema } from "@/lib/schemas/create-institute";

async function createInstitute(i: CreateInstituteSchema) {
    "use server";
    try {
        const res = await fetch(`${process.env.API_URL}institute`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(i),
        });

        if (!res.ok) {
            const err = await res.json();
            return { success: false, data: null, error: err.error || res.statusText };
        }

        const data = await res.json();

        return { success: true, data, error: "" };
    } catch (err) {
        return { success: false, data: null, error: "Network/server error" };
    }
}


export default function Page() {
    return (
        <CreateInstitute createInstitute={createInstitute} />
    )
}
