"use client";

import { useRouter } from "next/navigation";
import { SchoolForm } from "@/features/school/components/school-form";

export default function OnboardingSchoolPage() {
  const router = useRouter();
  return <SchoolForm onSuccess={() => router.replace("/")} />;
}
