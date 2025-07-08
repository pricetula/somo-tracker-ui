import { handleGetMe } from "@/features/me/handle-get-me";
import { MeHydrator } from "@/features/me/store-hydrator";
import { createSchool } from "../actions";
import { CreateSchoolForm } from "./CreateSchoolForm";

export async function CreateSchool() {
    const me = await handleGetMe()
    return (
        <div className="h-3/4 flex items-center justify-center">
            <CreateSchoolForm onSubmitSchool={createSchool} />
            <MeHydrator me={me} />
        </div>
    )
}
