"use client"

import { SchoolForm } from "@/features/school/components/school-form";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <SchoolForm
            onSuccess={() => {
                router.push("/");
            }}
        />
    )
}
