import { createInstitute } from "./actions";
import { FormWrapper } from "./FormWrapper";

export function CreateInstitute() {
    return (
        <div className="h-full flex items-center justify-center">
            <FormWrapper createInstitute={createInstitute} />
        </div>
    )
}
