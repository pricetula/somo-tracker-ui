"use client";

import { useRouter } from "next/navigation";
import { CreateInstituteForm } from "@/features/institutes/components/create-institute-form";

export default function OnboardingInstitutePage() {
    const router = useRouter();
    return <CreateInstituteForm onSuccess={() => router.replace("/onboarding/school")} />;
}
