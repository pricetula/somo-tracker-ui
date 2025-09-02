import { EducationSystemsHydrator } from "@/features/education-system/store"
import { getEducationSystems } from "@/features/education-system/services/get-education-system"
import { createInstitute } from "../../services/create-institute"
import { CreateInstituteForm } from "./CreateInstituteForm"

export async function CreateInstitute() {
    const { data } = await getEducationSystems()
    return (
        <div className="h-full flex justify-center pt-8">
            <CreateInstituteForm createInstitute={createInstitute} />
            <EducationSystemsHydrator educationSystems={data} />
        </div>
    )
}