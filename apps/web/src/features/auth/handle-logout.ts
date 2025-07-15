import { redirect } from "next/navigation";
import { deleteAuthCookie } from "./utils/cookies";

export async function handleLogout() {
    await deleteAuthCookie()
    return redirect("/signin")
}