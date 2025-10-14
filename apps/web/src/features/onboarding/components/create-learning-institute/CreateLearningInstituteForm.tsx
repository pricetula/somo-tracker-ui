import { CreateInstituteForm } from "./components/create-institute-form";
import { CreateSchoolForm } from "./components/create-school-form";
import { CreateAdminForm } from "./components/create-admin-form";

export function CreateLearningInstituteForm() {
    return (
        <div>
            <CreateInstituteForm />
            <CreateSchoolForm />
            <CreateAdminForm />
        </div>
    )
}