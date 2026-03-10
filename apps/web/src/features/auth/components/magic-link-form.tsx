"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { magicLinkSchema, type MagicLinkInput } from "@/features/auth/types";
import { useMagicLink } from "@/features/auth/api/use-magic-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

export function MagicLinkForm() {
  const { mutate, isPending } = useMagicLink();

  const form = useForm<MagicLinkInput>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(data: MagicLinkInput) {
    mutate(data, {
      onSuccess: (result) => {
        if (!result.success && result.validationErrors?.email) {
          form.setError("email", { message: result.validationErrors.email[0] });
        }
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isPending}
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isPending ? "Sending link…" : "Send magic link"}
        </Button>
      </FieldGroup>
    </form>
  );
}
