import { redirect } from "next/navigation";
import { logout } from "@/features/auth/api/actions";

export async function GET() {
    await logout();
    redirect("/login");
}
