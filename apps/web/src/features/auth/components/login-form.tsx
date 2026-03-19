"use client";

import { useActionState } from "react";
import { sendMagicLinkAction } from "@/features/auth/api/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/types/action-result";

const initialState: ActionResult = { success: false, error: "" };

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(sendMagicLinkAction, initialState);

    if (state.success) {
        return (
            <div className="text-center space-y-2">
                <p className="text-sm font-medium">Check your email</p>
                <p className="text-sm text-muted-foreground">
                    We sent a magic link to your email. Click the link to sign in.
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="full_name">Full name (optional)</Label>
                <Input id="full_name" name="full_name" type="text" placeholder="Jane Smith" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    aria-describedby={state.validationErrors?.email ? "email-error" : undefined}
                />
                {state.validationErrors?.email && (
                    <p id="email-error" className="text-sm text-destructive">
                        {state.validationErrors.email[0]}
                    </p>
                )}
            </div>

            {!state.success && state.error && (
                <p className="text-sm text-destructive">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending} aria-busy={isPending}>
                {isPending ? "Sending…" : "Send magic link"}
            </Button>
        </form>
    );
}
