"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { createInstituteSchema, type CreateInstituteFormValues } from "@/features/institutes/types";
import { useCreateInstitute } from "@/features/institutes/api/use-institute-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

interface CreateInstituteFormProps {
    onSuccess?: () => void;
}

export function CreateInstituteForm({ onSuccess }: CreateInstituteFormProps) {
    const createInstitute = useCreateInstitute();

    const form = useForm<CreateInstituteFormValues>({
        resolver: zodResolver(createInstituteSchema),
        defaultValues: { name: "" },
    });

    function onSubmit(values: CreateInstituteFormValues) {
        createInstitute.mutate(values, {
            onSuccess: (result) => {
                if (!result.success) {
                    form.setError("root", { message: result.error });
                    return;
                }
                onSuccess?.();
            },
            onError: () => {
                form.setError("root", {
                    message: "An unexpected error occurred. Please try again.",
                });
            },
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
                <Field data-invalid={!!form.formState.errors.name}>
                    <FieldLabel htmlFor="name">Institute name</FieldLabel>
                    <Input
                        id="name"
                        placeholder="My Institute"
                        disabled={createInstitute.isPending}
                        {...form.register("name")}
                    />
                    <FieldError errors={[form.formState.errors.name]} />
                </Field>

                {form.formState.errors.root && (
                    <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
                )}

                <Button type="submit" disabled={createInstitute.isPending}>
                    {createInstitute.isPending && <Loader2 className="animate-spin" />}
                    {createInstitute.isPending ? "Creating…" : "Create institute"}
                </Button>
            </FieldGroup>
        </form>
    );
}
