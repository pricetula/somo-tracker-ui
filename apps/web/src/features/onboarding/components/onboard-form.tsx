"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onboardAction } from "@/features/onboarding/api/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/types/action-result";
import type { OnboardResponse } from "@/features/onboarding/types";

const initialState: ActionResult<OnboardResponse> = { success: false, error: "" };

export function OnboardForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(onboardAction, initialState);

    useEffect(() => {
        if (state.success) {
            router.push("/");
        }
    }, [state.success, router]);

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="tenant_name">Organisation name</Label>
                <Input
                    id="tenant_name"
                    name="tenant_name"
                    type="text"
                    placeholder="Acme Academy"
                    required
                    aria-describedby={
                        !state.success && state.validationErrors?.tenant_name
                            ? "tenant-name-error"
                            : undefined
                    }
                />
                {!state.success && state.validationErrors?.tenant_name && (
                    <p id="tenant-name-error" className="text-sm text-destructive">
                        {state.validationErrors.tenant_name[0]}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="school_name">School name</Label>
                <Input
                    id="school_name"
                    name="school_name"
                    type="text"
                    placeholder="Acme High School"
                    required
                    aria-describedby={
                        !state.success && state.validationErrors?.school_name
                            ? "school-name-error"
                            : undefined
                    }
                />
                {!state.success && state.validationErrors?.school_name && (
                    <p id="school-name-error" className="text-sm text-destructive">
                        {state.validationErrors.school_name[0]}
                    </p>
                )}
            </div>

            {!state.success && state.error && (
                <p className="text-sm text-destructive">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending} aria-busy={isPending}>
                {isPending ? "Setting up…" : "Get started"}
            </Button>
        </form>
    );
}
