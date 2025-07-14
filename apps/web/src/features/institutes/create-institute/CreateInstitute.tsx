import { createInstitute } from "./actions";
import { CreateInstituteForm } from "./CreateInstituteForm";

interface CreateInstituteProps {
    onSuccess(): void;
}

export function CreateInstitute({ onSuccess }: CreateInstituteProps) {
    return (
        <div className="h-full flex items-center justify-center">
            <CreateInstituteForm onSubmit={createInstitute} onSuccess={onSuccess} />
        </div>
    )
}