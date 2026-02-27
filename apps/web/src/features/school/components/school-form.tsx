"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { schoolFormSchema, type SchoolFormValues, type School } from "@/features/school/types";
import { useCreateSchools, useUpdateSchool } from "@/features/school/api/use-school-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { EducationSystemCombobox } from "@/features/education-system/components/education-system-combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SchoolFormProps {
  school?: School;
  onSuccess?: () => void;
}

export function SchoolForm({ school, onSuccess }: SchoolFormProps) {
  const isEditing = !!school;
  const createSchools = useCreateSchools();
  const updateSchool = useUpdateSchool();
  const isPending = createSchools.isPending || updateSchool.isPending;

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: school?.name ?? "",
      address: school?.address ?? "",
      description: school?.description ?? "",
      website: school?.website ?? "",
      education_system_id: school?.education_system_id ?? "",
      is_home_school: school?.is_home_school ?? false,
    },
  });

  function onSubmit(values: SchoolFormValues) {
    if (isEditing) {
      updateSchool.mutate(
        { id: school.id, ...values },
        {
          onSuccess: (result) => {
            if (!result.success) {
              form.setError("root", { message: result.error });
              return;
            }
            onSuccess?.();
          },
        }
      );
    } else {
      createSchools.mutate(
        [values],
        {
          onSuccess: (result) => {
            if (!result.success) {
              form.setError("root", { message: result.error });
              return;
            }
            form.reset();
            onSuccess?.();
          },
        }
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            placeholder="School name"
            disabled={isPending}
            {...form.register("name")}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.address}>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Input
            id="address"
            placeholder="123 Main St"
            disabled={isPending}
            {...form.register("address")}
          />
          <FieldError errors={[form.formState.errors.address]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.website}>
          <FieldLabel htmlFor="website">Website</FieldLabel>
          <Input
            id="website"
            type="url"
            placeholder="https://example.com"
            disabled={isPending}
            {...form.register("website")}
          />
          <FieldError errors={[form.formState.errors.website]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            placeholder="Optional description"
            disabled={isPending}
            {...form.register("description")}
          />
          <FieldError errors={[form.formState.errors.description]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.education_system_id}>
          <FieldLabel>Education System</FieldLabel>
          <EducationSystemCombobox
            value={form.watch("education_system_id")}
            onChange={(system) =>
              form.setValue("education_system_id", system?.id ?? "", { shouldValidate: true })
            }
            disabled={isPending}
          />
          <FieldError errors={[form.formState.errors.education_system_id]} />
        </Field>

        <Field>
          <div className="flex items-center justify-between ">
            <RadioGroup defaultValue="school" className="w-fit">
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="school"
                  id="r3"
                  onClick={() => {
                    form.setValue("is_home_school", false, { shouldValidate: true });
                  }}
                />
                <Label htmlFor="r3">Standard</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="home"
                  id="r2"
                  onClick={() => {
                    form.setValue("is_home_school", true, { shouldValidate: true });
                  }}
                />
                <Label htmlFor="r2">Home School</Label>
              </div>
            </RadioGroup>
          </div>
        </Field>

        {form.formState.errors.root && (
          <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isEditing
            ? isPending ? "Saving…" : "Save changes"
            : isPending ? "Creating…" : "Create school"}
        </Button>
      </FieldGroup>
    </form>
  );
}
