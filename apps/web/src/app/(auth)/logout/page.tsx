"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api/actions";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        logout().then(() => {
            router.replace("/login");
        });
    }, []);

    return null;
}
