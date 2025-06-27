import { redirect } from "next/navigation";
import { deleteAuthCookie } from "./utils/cookies";

export function handleLogout() {
    deleteAuthCookie()
    return redirect("/signin")
}