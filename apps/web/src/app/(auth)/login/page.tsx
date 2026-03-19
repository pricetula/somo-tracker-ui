import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-semibold">Sign in</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and we&apos;ll send you a magic link.
                    </p>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
