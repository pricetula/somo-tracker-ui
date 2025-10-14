import { ChooseInstituteType } from "@/features/onboarding/components/choose-institute-type";

export const metadata = {
    title: "Launch Your Performance Hub | SomoTracker",
    description: "Create your institute or home school to manage exams and track academic progress.",
    keywords: ["school management", "student performance", "exam tracking", "education insights"],
};

export default async function Page() {
    return (
        <ChooseInstituteType />
    );
}