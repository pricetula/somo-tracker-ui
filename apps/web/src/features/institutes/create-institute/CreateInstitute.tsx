import { createInstitute } from "./actions";
import { CreateInstituteForm } from "./CreateInstituteForm";

export function CreateInstitute() {
    return (
        <div className="h-full flex items-center justify-center">
            <CreateInstituteForm onSubmit={createInstitute} />
        </div>
    )
}