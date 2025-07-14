import { createAdmin } from "./actions";
import { CreateAdminForm } from "./CreateAdminForm";

interface CreateAdminProps {
    onSuccess(): void;
}

export function CreateAdmin({ onSuccess }: CreateAdminProps) {
    return (
        <div className="h-full flex items-center justify-center">
            <CreateAdminForm onSubmit={createAdmin} onSuccess={onSuccess} />
        </div>
    );
}