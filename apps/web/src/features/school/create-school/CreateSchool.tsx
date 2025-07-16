import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { redirect } from "next/navigation";
import { getEducationSystems } from "@/features/education-system/queries/get-education-system";
import { createSchool } from "./actions";
import { CreateSchoolForm } from "./CreateSchoolForm";
import { EducationSystemsHydrator } from "@/features/education-system/store-hydrator";

export async function CreateSchool() {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signout");
    }

    // Variable to hold me data which is the current user and their institute
    let educationSystems = await getEducationSystems(token);

    return (
        <div className="h-full flex items-center justify-center">
            <CreateSchoolForm onSubmit={createSchool} />
            <EducationSystemsHydrator educationSystems={educationSystems} />
        </div>
    )
}
