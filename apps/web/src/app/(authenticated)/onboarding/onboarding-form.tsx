"use client";

import { useRouter } from "next/navigation";
import { SchoolForm } from "@/features/school/components/school-form";

export function OnboardingForm() {
  const router = useRouter();
  return (
    <SchoolForm onSuccess={() => router.push("/")} />
  );
}
