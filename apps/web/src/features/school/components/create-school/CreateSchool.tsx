import { createSchool } from "../../services/create-school";
import { CreateSchoolForm } from "./CreateSchoolForm";

export async function CreateSchool() {
    return (
        <div className="h-full flex items-center justify-center">
            <CreateSchoolForm createSchool={createSchool} />
        </div>
    )
}
