import { createSchool } from "../actions";
import { CreateSchoolForm } from "./CreateSchoolForm";

export async function CreateSchool() {
    return (
        <div className="h-full flex items-center justify-center">
            <CreateSchoolForm onSubmitSchool={createSchool} />
        </div>
    )
}
