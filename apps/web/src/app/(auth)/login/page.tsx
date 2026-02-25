import { MagicLinkForm } from "@/features/auth/components/magic-link-form";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your account with a magic link.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and we&apos;ll send you a magic link.
          </p>
        </div>
        <MagicLinkForm />
      </div>
    </main>
  );
}
