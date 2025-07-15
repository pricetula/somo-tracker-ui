import { onboardNewAdmin } from "./actions";
import { OnboardNewAdminForm } from "./OnboardNewAdminForm";

export function OnboardNewAdmin() {
    return (
        <div className="h-full flex items-center justify-center">
            <OnboardNewAdminForm onSubmit={onboardNewAdmin} />
        </div>
    );
}