"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMe } from "@/features/me/api/use-me";
import { useInviteUser } from "@/features/invitations/api/use-invitation-mutations";
import {
  inviteUserSchema,
  INVITE_ROLES,
  type InviteUserFormValues,
} from "@/features/invitations/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteUserFormProps {
  onSuccess?: () => void;
}

export function InviteUserForm({ onSuccess }: InviteUserFormProps) {
  const { data: meData } = useMe();
  const me = meData?.success ? meData.data : null;

  const inviteUser = useInviteUser();

  const form = useForm<InviteUserFormValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      school_id: me?.school_id ?? "",
      role: undefined,
    },
  });

  useEffect(() => {
    if (me?.school_id) {
      form.setValue("school_id", me.school_id);
    }
  }, [me?.school_id]); // eslint-disable-line react-hooks/exhaustive-deps

  function onSubmit(values: InviteUserFormValues) {
    inviteUser.mutate(values, {
      onSuccess: (result) => {
        if (!result.success) {
          form.setError("root", { message: result.error });
          return;
        }
        form.reset();
        onSuccess?.();
      },
      onError: () => {
        form.setError("root", { message: "An unexpected error occurred. Please try again." });
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="user@example.com"
            disabled={inviteUser.isPending}
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.role}>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <Select
            onValueChange={(value) =>
              form.setValue("role", value as InviteUserFormValues["role"], { shouldValidate: true })
            }
            disabled={inviteUser.isPending}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {INVITE_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[form.formState.errors.role]} />
        </Field>

        {form.formState.errors.root && (
          <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
        )}

        <Button type="submit" disabled={inviteUser.isPending}>
          {inviteUser.isPending && <Loader2 className="animate-spin" />}
          {inviteUser.isPending ? "Sending…" : "Send invitation"}
        </Button>
      </FieldGroup>
    </form>
  );
}
