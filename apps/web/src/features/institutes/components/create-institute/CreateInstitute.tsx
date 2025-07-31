import { CreateInstituteForm } from "./CreateInstituteForm"
import { createInstitute } from "../../services/create-institute"

export async function CreateInstitute() {
    return (
        <div className="h-full flex justify-center pt-20">
            <CreateInstituteForm createInstitute={createInstitute} />
        </div>
    )
}