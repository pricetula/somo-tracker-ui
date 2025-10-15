"use client"

import { CreateInstituteForm } from "./components/create-institute-form";
import { CreateSchoolForm } from "./components/create-school-form";
import { CreateAdminForm } from "./components/create-admin-form";
import { useOnboardLearningInstituteStore } from "./store";

export function CreateLearningInstituteForm() {
    // Get stage from store
    const stage = useOnboardLearningInstituteStore((store) => store.stage(store))

    return (
        <div className="h-4/5 flex items-center justify-center">
            {
                stage === 1 && <CreateInstituteForm /> ||
                stage === 2 && <CreateSchoolForm /> ||
                stage === 3 && <CreateAdminForm />
            }
        </div>
    )
}