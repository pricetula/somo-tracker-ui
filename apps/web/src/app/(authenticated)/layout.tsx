import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMeAction } from "@/features/me/api/actions";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token");

    if (!sessionToken) {
        redirect("/login");
    }

    const result = await getMeAction();

    if (!result.success) {
        redirect(result.code === 401 ? "/logout" : "/login");
    }

    const { school, tenant } = result.data;

    if (!tenant || !school) {
        redirect("/onboarding");
    }

    return <>{children}</>;
}
