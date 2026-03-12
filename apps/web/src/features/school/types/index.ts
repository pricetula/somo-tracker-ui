import { z } from "zod";
import type { components } from "@/types/api";

export type School = components["schemas"]["somo-tracker-api_internal_school.School"];
export type AddSchoolRequest =
    components["schemas"]["internal_school_delivery_http.addSchoolRequest"];
export type UpdateSchoolRequest =
    components["schemas"]["internal_school_delivery_http.updateSchoolRequest"];

export const schoolFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().optional(),
    description: z.string().optional(),
    website: z.string().optional(),
    education_system_id: z.string().optional(),
    is_home_school: z.boolean().optional(),
});

export type SchoolFormValues = z.infer<typeof schoolFormSchema>;
