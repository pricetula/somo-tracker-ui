import { getAccessTokenFromAuthCookie } from "@/features/auth/utils/cookies";
import { redirect } from "next/navigation";
import { getEducationSystems } from "@/features/education-system/queries/get-education-system";
import { createSchool } from "./actions";
import { CreateSchoolForm } from "./CreateSchoolForm";
import { EducationSystemsHydrator } from "@/features/education-system/store-hydrator";
import { InstituteUser } from "@/features/me/types";
import { getMe } from "@/features/me/get-me";
import { EducationSystem } from "@/features/education-system/types";

export async function CreateSchool() {
    // Get the access token from the auth cookie
    const token = await getAccessTokenFromAuthCookie();

    // If there is no token, redirect to the signin page
    if (!token) {
        redirect("/signout");
    }

    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | null

    try {
        me = await getMe(token);
    } catch (error) {
        redirect("/signout");
    }

    // If me institute is not defined, redirect to the create institute page
    if (!me?.institute) {
        redirect("/create-institute");
    }

    // Variable to hold me data which is the current user and their institute
    let educationSystems: EducationSystem[] = await getEducationSystems(token);

    return (
        <div className="h-full flex items-center justify-center">
            <CreateSchoolForm onSubmit={createSchool} />
            <EducationSystemsHydrator educationSystems={educationSystems} />
        </div>
    )
}
