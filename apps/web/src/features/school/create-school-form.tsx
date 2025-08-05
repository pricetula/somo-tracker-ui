"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateSchoolForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    alert("School creation submitted! Check the console.");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          School Name
        </label>
        <input
          id="name"
          {...form.register("name")}
          className="w-full px-3 py-2 border rounded-md"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-1">
          Address
        </label>
        <input
          id="address"
          {...form.register("address")}
          className="w-full px-3 py-2 border rounded-md"
        />
        {form.formState.errors.address && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.address.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
