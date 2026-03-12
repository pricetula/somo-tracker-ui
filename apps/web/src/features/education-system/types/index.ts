import { z } from "zod";
import type { components } from "@/types/api";

export type EducationSystem =
    components["schemas"]["somo-tracker-api_internal_educationsystem.EducationSystem"];
export type AddEducationSystemRequest =
    components["schemas"]["internal_educationsystem_delivery_http.addEducationSystemRequest"];
export type UpdateEducationSystemRequest =
    components["schemas"]["internal_educationsystem_delivery_http.updateEducationSystemRequest"];

export const educationSystemFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});

export type EducationSystemFormValues = z.infer<typeof educationSystemFormSchema>;
