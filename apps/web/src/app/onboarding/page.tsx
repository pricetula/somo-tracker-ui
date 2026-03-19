import { OnboardForm } from "@/features/onboarding/components/onboard-form";

export default function OnboardingPage() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="mb-2 text-2xl font-semibold">Welcome — let&apos;s get you set up</h1>
                <p className="mb-6 text-sm text-muted-foreground">
                    Enter your organisation and school details to get started.
                </p>
                <OnboardForm />
            </div>
        </main>
    );
}
