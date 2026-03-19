"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyMagicLinkAction } from "@/features/auth/api/actions";

interface VerifyMagicLinkProps {
    token: string;
}

export function VerifyMagicLink({ token }: VerifyMagicLinkProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        verifyMagicLinkAction(token).then((result) => {
            if (result.success) {
                router.replace("/");
            } else {
                setError(result.error);
            }
        });
    }, [token, router]);

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-sm space-y-4 text-center">
                    <h1 className="text-2xl font-semibold">Link expired</h1>
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <a href="/login" className="text-sm underline underline-offset-4">
                        Back to sign in
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-4 text-center">
                <h1 className="text-2xl font-semibold">Signing you in…</h1>
                <p className="text-sm text-muted-foreground">
                    Please wait while we verify your link.
                </p>
            </div>
        </main>
    );
}
