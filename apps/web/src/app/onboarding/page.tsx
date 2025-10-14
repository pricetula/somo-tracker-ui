import { ChooseInstituteType } from "@/features/onboarding/components/choose-institute-type";
import { redirect } from "next/navigation"
import { TokenRefreshFailedError } from "@/features/auth/errors"
import { makeQueryClient } from "@/shared/lib/query-client"
import { meQuery } from "@/features/me/queries/config";
import { isUUIDNil } from "@/shared/utils/is-uuid-nil";
import { SchoolUser } from "@/features/school-user/types";

export const metadata = {
    title: "Launch Your Performance Hub | SomoTracker",
    description: "Create your institute or home school to manage exams and track academic progress.",
    keywords: ["school management", "student performance", "exam tracking", "education insights"],
};

export default async function Page() {
    const queryClient = makeQueryClient();
    let me: SchoolUser | null = null

    try {
        // Prefetch user before painting on the browser
        me = await queryClient.fetchQuery(meQuery);
    } catch (error) {
        if (error instanceof TokenRefreshFailedError) {
            redirect("/signout")
        }
    }

    // If me object exists then redirect to landing page
    if (me && !isUUIDNil(me.user_id)) {
        redirect("/")
    }

    return (
        <ChooseInstituteType />
    );
}