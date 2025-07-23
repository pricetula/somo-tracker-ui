import { redirect } from "next/navigation";
import { getEducationSystems } from "@/features/education-system/queries/get-education-system";
import { EducationSystemsHydrator } from "@/features/education-system/store-hydrator";
import { InstituteUser } from "@/features/me/types";
import { getMe } from "@/features/me/services/get-me";
import { EducationSystem } from "@/features/education-system/types";
import { createSchool } from "../../services/create-school";
import { CreateSchoolForm } from "./CreateSchoolForm";

export async function CreateSchool() {
    // Variable to hold me data which is the current user and their institute
    let me: InstituteUser | null

    try {
        me = await getMe();
    } catch (error) {
        redirect("/signout");
    }

    // If me institute is not defined, redirect to the create institute page
    if (!me?.institute) {
        redirect("/create-institute");
    }

    // Variable to hold me data which is the current user and their institute
    let educationSystems: EducationSystem[] = await getEducationSystems();

    return (
        <div className="h-full flex items-center justify-center">
            <CreateSchoolForm me={me} createSchool={createSchool} />
            <EducationSystemsHydrator educationSystems={educationSystems} />
        </div>
    )
}
